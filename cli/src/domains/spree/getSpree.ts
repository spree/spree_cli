import inquirer from 'inquirer';
import type Spree from './Spree';

type Answers = {
  spree: Spree;
};

type Options = {
  message: string;
};

const spreeTemplates = [
  {
    name: 'Spree (dockerized)',
    version: 'docker',
    gitRepositoryURL: 'https://github.com/spree/spree_starter',
    documentationURL: 'https://dev-docs.spreecommerce.org/'
  },
  {
    name: 'Spree (no docker)',
    version: 'no-docker',
    gitRepositoryURL: 'https://github.com/spree/spree_starter',
    documentationURL: 'https://dev-docs.spreecommerce.org/'
  }
];

/** Gets the integration from user's input. */
const getSpree = async (options: Options): Promise<Spree> => {
  const { message } = options;

  const choices = [...spreeTemplates].map((spree) => ({
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
