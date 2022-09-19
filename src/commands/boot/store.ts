import { Command } from '@oclif/core';
import * as fs from 'fs';
import { t } from 'i18next';
import * as path from 'path';
import { spawn } from 'child_process';

import { getProjectName } from '../../domains/project-name';
import { useVariables } from '../../domains/variables';
import { notEmpty } from '../../domains/typescript';
import type RunScript from '../../domains/run/RunScript';
import type Runner from '../../domains/module/Runner';
import type {BootModule} from '../../domains/module/Module';
import { getRunScript } from '../../domains/run';
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

    const fetchRunScript = async (runScriptPath: string | undefined): Promise<RunScript | undefined> => {
      if (!notEmpty<string>(runScriptPath)) return;
      const runScript = await getRunScript(runScriptPath);
      return runScript;
    };

    const runScripts = await Promise.all(modules.map(({ template: { runScriptPath } }) => fetchRunScript(runScriptPath)));

    const runners: Runner[] = modules.map(({ path, buildOptions, template: { name} }, i: number) => ({
      name: name,
      module: path,
      buildOptions: buildOptions,
      buildScript: runScripts[i]
    })
    );

    runners.forEach(({ name, module, buildOptions, buildScript }) => {
      if (buildScript) {
        spawn(buildScript, buildOptions);
      } else {
        this.log(t('command.boot_store.message.failure', { module, name }));
      }
    });
  }
}
