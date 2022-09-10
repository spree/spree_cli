import { t } from 'i18next';
import inquirer from 'inquirer';
import existsDirectory from './existsDirectory';

const createDirectory = async (dir: string): Promise<boolean> => {
  if (await existsDirectory(dir)) {
    const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
      type: 'confirm',
      name: 'overwrite',
      message: () => t('command.generate_store.input.overwrite', { dir })
    });
    return overwrite;
  }
  return true;
};

export default createDirectory;
