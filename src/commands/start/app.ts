import { Command } from '@oclif/core';
import * as fs from 'fs';
import { t } from 'i18next';
import * as path from 'path';
import { spawn } from 'child_process';

import { useVariables } from '../../domains/variables';
import type Runner from '../../domains/module/Runner';
import type {BootModule} from '../../domains/module/Module';
import validateDependencies from '../../domains/dependencies/validate/validateDependencies';

export default class StartApp extends Command {
  static override description = t('command.start_app.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const projectDir = path.resolve();
    const variables = await (async () => {
      return useVariables({ projectName: path.basename(projectDir) });
    })();

    const modules: BootModule[] = JSON.parse(fs.readFileSync(`${projectDir}/${variables.projectDetailsFileName}.json`, {encoding: 'utf8', flag: 'r'}));

    await validateDependencies(modules);

    const runners: Runner[] = modules
      .filter(({ template: { runScriptLocalPath } }) => Boolean(runScriptLocalPath))
      .map(({ path, buildOptions, template: { name, runScriptLocalPath } }) => ({
        name: name,
        module: path,
        buildOptions: buildOptions,
        runScript: fs.readFileSync(`${projectDir}/${runScriptLocalPath}`, {encoding: 'utf8', flag: 'r'})
      }));

    runners.forEach(({ name, module, buildOptions, runScript }) => {
      if (runScript) {
        spawn(runScript, buildOptions);
      } else {
        this.log(t('command.start_app.message.failure', { module, name }));
      }
    });
  }
}
