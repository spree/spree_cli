import { Command, CliUx, Flags } from '@oclif/core';
import * as fs from 'fs';
import color from '@oclif/color';
import { t } from 'i18next';
import * as path from 'path';
import inquirer from 'inquirer';
import { spawn } from 'child_process';

import { getProjectName } from '../../domains/project-name';
import {
  cloneGitRepository,
  terminateGitRepository
} from '../../domains/git-repository';
import { createDirectory } from '../../domains/directory';
import { getSpree } from '../../domains/spree';
import { getIntegration } from '../../domains/integration';
import type { Module } from '../../domains/module';
import { BuildScript, getBuildScript } from '../../domains/build';
import { getRunScript } from '../../domains/run';
import { useVariables } from '../../domains/variables';
import type Runner from '../../domains/module/Runner';
import { notEmpty } from '../../domains/typescript';
import existsDirectory from '../../domains/directory/existsDirectory';
import { removeFileOrDirectory } from '../../domains/directory';
import type { BootModule } from '../../domains/module/Module';
import validateDependencies from '../../domains/dependencies/validate/validateDependencies';
import type RunScript from '../../domains/run/RunScript';

export default class NewApp extends Command {
  static override description = t('command.new_app.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {
    beta: Flags.boolean({
      description: t('command.new_app.flag.beta')
    })
  };

  static override args = [];

  async run(): Promise<void> {
    const { flags } = await this.parse(NewApp);
    const variables = await (async () => {
      const projectName = await getProjectName(t('command.new_app.input.project_name'));
      return useVariables({ projectName });
    })();

    const projectDir = path.resolve(variables.projectName);

    const { samples, ...spree } = await getSpree({ message: t('command.new_app.input.spree'), includeBeta: flags.beta });

    const { samples: withSamples } = await inquirer.prompt({
      message: t('command.new_app.input.samples') as string,
      type: 'confirm',
      name: 'samples'
    });

    const integration = await getIntegration({
      message: t('command.new_app.input.integration'),
      customIntegrationRepositoryMessage: t('command.new_app.input.custom_integration_repository')
    });

    const modules: Module[] = [
      {
        template: withSamples && samples ? {
          ...spree,
          ...samples
        } : { ...spree },
        path: variables.pathBackend,
        buildOptions: { encoding: 'utf-8', stdio: 'inherit', shell: true }
      },
      {
        template: integration,
        path: variables.pathIntegration,
        buildOptions: { stdio: 'inherit', shell: true }
      }
    ].map((m) => ({
      ...m,
      template: {
        ...m.template,
        runScriptLocalPath: m.template.runScriptURL ? `run-${m.path}` : undefined
      },
      absolutePath: `${projectDir}/${m.path}`
    }));

    const mountGitRepository = async (dir: string, gitRepositoryURL: string, gitRef: string) => {
      if (await existsDirectory(dir)) {
        await removeFileOrDirectory(dir);
      }
      await cloneGitRepository({ dir, gitRepositoryURL, gitRef });
      await terminateGitRepository(projectDir);
    };

    const repositoriesToMount: { name: string, fn?: () => Promise<void> }[] = [];

    await validateDependencies(modules);

    for (const { absolutePath, template: { gitRepositoryURL, name, gitRef }} of modules) {
      if (!gitRepositoryURL) continue;
      const gitRefWithDefault = gitRef || 'main';
      const shouldCreateDirectory = await createDirectory(absolutePath);
      const fn = shouldCreateDirectory ? (async () => await mountGitRepository(absolutePath, gitRepositoryURL, gitRefWithDefault)) : undefined;
      repositoriesToMount.push({ name, fn });
    }

    for (const {name, fn} of repositoriesToMount) {
      if (fn) {
        await fn();
      } else {
        this.log(t('command.new_app.message.skipping', { name }));
      }
    }

    this.log('');
    this.log(t('command.new_app.message.success', { projectName: variables.projectName }));
    this.log('');

    const logModuleDocumentation = ({ template: { documentationURL, name }}: Module) => {
      if (!documentationURL) return;
      this.log(t('command.new_app.message.configure', { documentationURL, name }));
      this.log('');
    };
    modules.forEach(logModuleDocumentation);

    const fetchBuildScript = async ({ template: { buildScriptURL: url }}: Module): Promise<BuildScript | undefined> => {
      if (!notEmpty<string>(url)) return;
      const preBuildScript = variables.pathBackend ? (integration.preSpreeBuildScript || '') : '';
      const buildScript = await getBuildScript(url);
      return preBuildScript.concat(buildScript);
    };
    CliUx.ux.action.start(t('command.new_app.message.build_scripts'));
    const buildScripts = await Promise.all(modules.map(fetchBuildScript));
    CliUx.ux.action.stop(color.green(t('command.new_app.message.done')));

    const fetchRunScript = async ({ template: { runScriptURL: url }}: Module): Promise<RunScript | undefined> => {
      if (!notEmpty<string>(url)) return;
      const runScript = await getRunScript(url);
      return runScript;
    };
    CliUx.ux.action.start(t('command.new_app.message.run_scripts'));
    const runScripts = await Promise.all(modules.map(fetchRunScript));
    CliUx.ux.action.stop(color.green(t('command.new_app.message.done')));

    const runnersMap = modules.reduce(
      (res, { path, buildOptions, template: { name }}, i) => ({
        ...res,
        [path]: { name, buildOptions, buildScript: buildScripts[i], runScript: runScripts[i] }
      }),
      {} as Record<string, Runner>
    );

    const runModules: BootModule[] = modules.map(
      ({ path, buildOptions, template: { name, runScriptPath, runScriptLocalPath, dependencies } }) => ({
        path: path,
        buildOptions: buildOptions,
        template: {
          name: name,
          runScriptPath: runScriptPath,
          runScriptLocalPath: runScriptLocalPath,
          dependencies: dependencies
        }
      })
    );

    fs.writeFileSync(`${projectDir}/${variables.projectDetailsFileName}.json`, JSON.stringify(runModules, null, 2));

    for (const [runnerKey, runner] of Object.entries(runnersMap)) {
      if (runner.runScript) fs.writeFileSync(`${projectDir}/run-${runnerKey}`, runner.runScript);
    }

    const executeRunner = ({ buildScript, buildOptions, name }: Runner) => {
      if (buildScript) {
        spawn(buildScript, buildOptions);
      } else {
        this.debug(t('command.new_app.message.build_scripts_skipping', { name }));
      }
    };

    [variables.pathBackend, variables.pathIntegration]
      .map((path) => runnersMap[path])
      .filter(notEmpty<Runner>)
      .forEach((runner) => executeRunner(runner));
  }
}
