import inquirer from 'inquirer';
import type { Spree } from '.';
import { fetchSpreeTemplates } from '.';

type Answers = {
  spree: Spree;
};

type Options = {
  message: string;
};

/** Gets the integration from user's input. */
const getSpree = async (options: Options): Promise<Spree> => {
  const { message } = options;

  const spreeTemplates = await fetchSpreeTemplates();

  const choices = spreeTemplates.map((spree) => ({
    name: spree.name,
    value: spree
  }));

  const answers = await inquirer.prompt<Answers>({
    choices,
    message,
    type: 'list',
    name: 'spree'
  });
  if (answers.spree.gitRepositoryURL) return answers.spree;

  return {
    ...answers.spree
  };
};

export default getSpree;
