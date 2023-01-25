import inquirer from 'inquirer';
import type Integration from './Integration';
import fetchIntegrations from './fetchIntegrations';
import { getGitRepositoryURL } from '../git-repository-url';

type CustomIntegration = Omit<Partial<Integration>, 'name'> & {
  name: Integration['name'];
  buildIntegration: (integration: CustomIntegration) => Promise<Integration>;
};

const isCustomIntegration = (integration: Integration | CustomIntegration): integration is CustomIntegration => {
  return (<CustomIntegration>integration).buildIntegration !== undefined;
};

/** The answers expected in the form of 'inquirer'. */
type Answers = {
  integration: Integration | CustomIntegration;
};

type Options = {
  message: string;
  customIntegrationRepositoryMessage: string;
};

/** Gets the integration from user's input. */
const getIntegration = async (options: Options): Promise<Integration> => {
  const { message, customIntegrationRepositoryMessage } = options;

  const integrations = await fetchIntegrations();

  const customIntegrations: CustomIntegration[] = [
    {
      name: 'Rails storefront',
      buildIntegration: async ({ name }) => ({
        name,
        preSpreeBuildScript: 'echo "gem \'spree_frontend\'" >> $SPREE_CLI_PROJECT_NAME/$SPREE_CLI_PATH_BACKEND/Gemfile\n'
      } as Integration)
    },
    {
      name: 'No storefront (Spree Headless)',
      buildIntegration: async () => ({
        name: 'headless'
      })
    },
    {
      name: 'Custom storefront',
      buildIntegration: async (customIntegration) => ({
        ...customIntegration,
        gitRepositoryURL: await getGitRepositoryURL(customIntegrationRepositoryMessage)
      })
    }
  ];

  const choices = [...integrations, ...customIntegrations].map((integration) => ({
    name: integration.name,
    value: integration
  }));

  const { integration } = await inquirer.prompt<Answers>({
    choices,
    message,
    type: 'list',
    name: 'integration'
  });

  return isCustomIntegration(integration)
    ? integration.buildIntegration(integration)
    : integration;
};

export default getIntegration;
