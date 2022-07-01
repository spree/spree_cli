// @ts-nocheck TODO: remove this later and check file
import { Command } from '@oclif/core';
import { t } from 'i18next';
import inquirer from 'inquirer';
import picocolors from 'picocolors';
import * as path from 'path';
import { getProjectName } from '../../domains/project-name';
import { cloneGitRepository, terminateGitRepository } from '../../domains/git-repository';
import { existsDirectory } from '../../domains/directory';
import { getSpree } from '../../domains/spree'

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const projectName = await getProjectName(t('command.generate_store.input.project_name'));

    const spree = await getSpree({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t('command.generate_store.input.custom_integration_repository')
    });

    const projectDir = path.resolve(projectName);

    if (await existsDirectory(projectDir)) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: () => t('command.generate_store.input.overwrite', { projectName })
      });

      if (!overwrite) {
        this.log(t('command.generate_store.message.skipping'));
        this.exit(0);
      }
    }

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: spree.gitRepositoryURL
    });

    await terminateGitRepository(projectDir);

    this.exit(0);
  }
}
