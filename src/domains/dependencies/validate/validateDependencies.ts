import type { Module, BootModule } from '../../module/Module';
import { CliUx } from '@oclif/core';
import { t } from 'i18next';
import checkDependency from '../checkDependencies';
import color from '@oclif/color';
const validateDependenciesForModule = async (module: Module | BootModule) => {
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
      throw new Error(t('command.generate_store.message.dependency_not_found', { name }));
    } else if (result.status === 'VERSION_MISMATCH') {
      CliUx.ux.action.stop(color.red(t('command.generate_store.message.error')));
      throw new Error(t('command.generate_store.message.dependency_version_mismatch', { name, expectedVersion: versionString, currentVersion: result.versionFound}));
    }
  }
};

const validateDependencies = async (modules: Module[] | BootModule[] ) => {
  for (const module of modules) {
    await validateDependenciesForModule(module);
  }
};

export default validateDependencies;
