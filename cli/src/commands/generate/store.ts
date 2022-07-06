import { Command } from '@oclif/core';
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
import { getBuildScript } from '../../domains/build';
import { useVariables } from '../../domains/variables';
import type Runner from '../../domains/module/Runner';
import { notEmpty } from '../../domains/typescript';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const variables = await (async () => {
      const projectName = await getProjectName(
        t('command.generate_store.input.project_name')
      );
      return useVariables({ projectName });
    })();

    const projectDir = path.resolve(variables.projectName);

    const spree = await getSpree({
      message: t('command.generate_store.input.spree')
    });

    const integration = await getIntegration({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t(
        'command.generate_store.input.custom_integration_repository'
      )
    });

    const modules: Module[] = integration ? [
      {
        template: spree,
        path: variables.pathBackend,
        buildOptions: { encoding: 'utf-8', stdio: 'inherit', shell: true }
      },
      {
        template: integration,
        path: variables.pathIntegration,
        buildOptions: { shell: true }
      }
    ].map((m) => ({ ...m, absolutePath: `${projectDir}/${m.path}` })) : [
      {
        template: spree,
        path: variables.pathBackend,
        buildOptions: { encoding: 'utf-8', stdio: 'inherit', shell: true }
      }
    ].map((m) => ({ ...m, absolutePath: `${projectDir}/${m.path}` }));

    const handleCreateDirectoryResponse = (success: boolean) => {
      if (success) return;
      this.log(t('command.generate_store.message.skipping'));
      this.exit(0);
    };

    const mountGitRepository = async (
      dir: string,
      gitRepositoryURL: string
    ) => {
      await cloneGitRepository({
        dir,
        gitRepositoryURL
      });

      await terminateGitRepository(projectDir);
    };

    await Promise.all(modules.map((m) => m.absolutePath).map(createDirectory)).then(
      (responses) => responses.forEach(handleCreateDirectoryResponse)
    );

    await Promise.all(
      modules.map((m) =>
        mountGitRepository(m.absolutePath, m.template.gitRepositoryURL)
      )
    );
    const buildScripts = await Promise.all(
      modules
        .map((m) => m.template.buildScriptURL)
        .map((url) => url && getBuildScript(url))
    );

    const runnersMap = modules.reduce(
      (res, m, i) => ({
        ...res,
        [m.path]: {
          name: m.template.name,
          buildOptions: m.buildOptions,
          buildScript: buildScripts[i]
        }
      }),
      {} as Record<string, Runner>
    );

    const executeRunner = ({ buildScript, buildOptions }: Runner) => {
      if (buildScript) spawn(buildScript, buildOptions);
    };

    [variables.pathBackend, variables.pathIntegration]
      .map((path) => runnersMap[path])
      .filter(notEmpty<Runner>)
      .forEach((runner) => executeRunner(runner));
  }
}
