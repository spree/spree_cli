import { Command } from '@oclif/core';
import * as fs from 'fs';
import { t } from 'i18next';
import * as path from 'path';
import { spawn } from 'child_process';

import { getProjectName } from '../../domains/project-name';
import { useVariables } from '../../domains/variables';
import type Runner from '../../domains/module/Runner';
import type {BootModule} from '../../domains/module/Module';
import validateDependencies from '../../domains/dependencies/validate/validateDependencies';

export default class BootStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const variables = await (async () => {
      const projectName = await getProjectName(t('command.boot_store.input.project_name'));
      return useVariables({ projectName });
    })();

    const projectDir = path.resolve(variables.projectName);
    const modules: BootModule[] = JSON.parse(fs.readFileSync(`${projectDir}/${variables.projectDetailsFileName}.json`, {encoding: 'utf8', flag: 'r'}));

    await validateDependencies(modules);

    const runners: Runner[] = modules.map(({ path, buildOptions, template: { name, runScriptPath } }) => ({
      name: name,
      module: path,
      buildOptions: buildOptions,
      buildScript: fs.readFileSync(`${projectDir}/${runScriptPath}`, {encoding: 'utf8', flag: 'r'})
    }));

    runners.forEach(({ name, module, buildOptions, buildScript }) => {
      if (buildScript) {
        spawn(buildScript, buildOptions);
      } else {
        this.log(t('command.boot_store.message.failure', { module, name }));
      }
    });
  }
}
