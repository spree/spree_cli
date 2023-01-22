import inquirer from 'inquirer';
import type { Spree } from '.';
import { fetchSpreeTemplates, buildSpreeChoices } from '.';
import type { Options } from '.';

type Answers = {
  spree: Spree;
};

/** Gets the integration from user's input. */
const getSpree = async (options: Options): Promise<Spree> => {
  const { message } = options;

  const templates = await fetchSpreeTemplates();

  const choices = buildSpreeChoices(templates, options);

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
