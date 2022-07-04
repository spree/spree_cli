import { Command } from '@oclif/core';
import { t } from 'i18next';
import * as path from 'path';
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
import { notEmpty } from '../../domains/typescript';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const projectName = await getProjectName(
      t('command.generate_store.input.project_name')
    );
    const projectDir = path.resolve(projectName);

    const spree = await getSpree({
      message: t('command.generate_store.input.spree')
    });

    const integration = await getIntegration({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t(
        'command.generate_store.input.custom_integration_repository'
      )
    });

    const modules: Module[] = [
      { template: spree, path: '/backend' },
      { template: integration, path: '/integration' }
    ].map((m) => ({ ...m, path: projectDir.concat(m.path) }));

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

    await Promise.all(modules.map((m) => m.path).map(createDirectory)).then(
      (responses) => responses.forEach(handleCreateDirectoryResponse)
    );

    await Promise.all(
      modules.map((m) =>
        mountGitRepository(m.path, m.template.gitRepositoryURL)
      )
    );

    // TODO: remove this eslint disable flag, when execution added.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildScripts = await Promise.all(
      modules
        .map((m) => m.template.buildScriptURL)
        .filter(notEmpty<BuildScript>)
        .map(getBuildScript)
    );
    // TODO: execute build scripts.

    this.exit(0);
  }
}
