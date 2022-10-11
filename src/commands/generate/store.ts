import { Command, CliUx } from '@oclif/core';
import color from '@oclif/color';
import { t } from 'i18next';
import * as path from 'path';
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
import { useVariables } from '../../domains/variables';
import type Runner from '../../domains/module/Runner';
import { notEmpty } from '../../domains/typescript';
import existsDirectory from '../../domains/directory/existsDirectory';
import { removeFileOrDirectory } from '../../domains/directory';
import checkDependency from '../../domains/dependencies/checkDependencies';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const variables = await (async () => {
      const projectName = await getProjectName(t('command.generate_store.input.project_name'));
      return useVariables({ projectName });
    })();

    const projectDir = path.resolve(variables.projectName);

    const spree = await getSpree({ message: t('command.generate_store.input.spree') });

    const integration = await getIntegration({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t('command.generate_store.input.custom_integration_repository')
    });

    const modules: Module[] = [
      {
        template: spree,
        path: variables.pathBackend,
        buildOptions: { encoding: 'utf-8', stdio: 'inherit', shell: true }
      },
      {
        template: integration,
        path: variables.pathIntegration,
        buildOptions: { stdio: 'inherit', shell: true }
      }
    ].map((m) => ({ ...m, absolutePath: `${projectDir}/${m.path}` }));

    const mountGitRepository = async (dir: string, gitRepositoryURL: string, gitRef: string) => {
      if (await existsDirectory(dir)) {
        await removeFileOrDirectory(dir);
      }
      await cloneGitRepository({ dir, gitRepositoryURL, gitRef });
      await terminateGitRepository(projectDir);
    };

    const repositoriesToMount: { name: string, fn?: () => Promise<void> }[] = [];

    await this._validateDependencies(modules);

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
        this.log(t('command.generate_store.message.skipping', { name }));
      }
    }

    this.log('');
    this.log(t('command.generate_store.message.success', { projectName: variables.projectName }));
    this.log('');

    const logModuleDocumentation = ({ template: { documentationURL, name }}: Module) => {
      if (!documentationURL) return;
      this.log(t('command.generate_store.message.configure', { documentationURL, name }));
      this.log('');
    };
    modules.forEach(logModuleDocumentation);

    const fetchBuildScript = async ({ template: { buildScriptURL: url }}: Module): Promise<BuildScript | undefined> => {
      if (!notEmpty<string>(url)) return;
      const preBuildScript = variables.pathBackend ? (integration.preSpreeBuildScript || '') : '';
      const buildScript = await getBuildScript(url);
      return preBuildScript.concat(buildScript);
    };
    CliUx.ux.action.start(t('command.generate_store.message.build_scripts'));
    const buildScripts = await Promise.all(modules.map(fetchBuildScript));
    CliUx.ux.action.stop(color.green(t('command.generate_store.message.done')));

    const runnersMap = modules.reduce(
      (res, { path, buildOptions, template: { name }}, i) => ({
        ...res,
        [path]: { name, buildOptions, buildScript: buildScripts[i] }
      }),
      {} as Record<string, Runner>
    );

    const executeRunner = ({ buildScript, buildOptions, name }: Runner) => {
      if (buildScript) {
        spawn(buildScript, buildOptions);
      } else {
        this.debug(t('command.generate_store.message.build_scripts_skipping', { name }));
      }
    };

    [variables.pathBackend, variables.pathIntegration]
      .map((path) => runnersMap[path])
      .filter(notEmpty<Runner>)
      .forEach((runner) => executeRunner(runner));
  }

  async _validateDependencies(modules: Module[]) {
    for (const module of modules) {
      await this._validateDependenciesForModule(module);
    }
  }

  async _validateDependenciesForModule(module: Module) {
    const { template: { dependencies }} = module;
    if (!dependencies) {
      return;
    }

    for (const [name, versionString] of Object.entries(dependencies)) {
      CliUx.ux.action.start(t('command.generate_store.message.dependency_checking', { name, expectedVersion: versionString}));
      const result = await checkDependency(name, versionString);

      if (result.status === 'OK') {
        CliUx.ux.action.stop(color.green(t('command.generate_store.message.done')));
      } else if (result.status === 'NOT_FOUND') {
        CliUx.ux.action.stop(color.red(t('command.generate_store.message.error')));
        this.error(t('command.generate_store.message.dependency_not_found', { name }));
      } else if (result.status === 'VERSION_MISMATCH') {
        CliUx.ux.action.stop(color.red(t('command.generate_store.message.error')));
        this.error(t('command.generate_store.message.dependency_version_mismatch', { name, expectedVersion: versionString, currentVersion: result.versionFound}));
      }
    }
  }
}
