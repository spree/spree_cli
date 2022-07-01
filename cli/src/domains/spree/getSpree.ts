import inquirer from 'inquirer';;
import type Integration from "../integration/Integration";

type Answers = {
  integration: Integration;
};

/** The answers expected in the form of 'inquirer'. */

type Options = {
  message: string;
};

const integrations = [
  {
    "id": "808ce800-24b0-4228-aa61-966f399b3ea3",
    "name": "Spree (dockerized)",
    "version": "docker",
    "gitRepositoryURL": "https://github.com/spree/spree_starter",
    "createdAt": "2022-02-23T04:55:48.881Z",
    "updatedAt": "2022-02-24T00:10:31.612Z",
    "documentationURL": "https://dev-docs.spreecommerce.org/"
  },
  {
    "id": "0a2083c5-4835-48fc-9143-212572fc66b9",
    "name": "Spree (no docker)",
    "version": "no-docker",
    "gitRepositoryURL": "https://github.com/spree/spree_starter",
    "createdAt": "2022-02-23T04:57:08.922Z",
    "updatedAt": "2022-02-24T00:11:53.291Z",
    "documentationURL": "https://dev-docs.spreecommerce.org/"
  }
]

/** Gets the integration from user's input. */
const getSpree = async (options: Options): Promise<Integration> => {
  const {message} = options;

  const choices = [...integrations].map((integration) => ({
    name: integration.name,
    value: integration
  }));

  const answers = await inquirer.prompt<Answers>({
    choices,
    message,
    type: 'list',
    name: 'integration'
  });
  if (answers.integration.gitRepositoryURL) return answers.integration;

  return {
    ...answers.integration
  };
};

export default getSpree;
