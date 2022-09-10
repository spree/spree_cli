import type { Variables } from '.';
import type { Diff } from '../typescript';

const defaultVariables: Omit<Variables, 'projectName'> = {
  pathBackend: 'backend',
  pathIntegration: 'integration',
  backendURL: 'http://localhost:4000'
};

type UserVariables = Partial<typeof defaultVariables> &
  Pick<Variables, Diff<keyof Variables, keyof typeof defaultVariables>>;

const useVariables = (userVariables: UserVariables): Variables => {
  const variables = { ...defaultVariables, ...userVariables };
  process.env.SPREE_CLI_PATH_BACKEND = variables.pathBackend;
  process.env.SPREE_CLI_PATH_INTEGRATION = variables.pathIntegration;
  process.env.SPREE_CLI_PROJECT_NAME = variables.projectName;
  process.env.SPREE_CLI_BACKEND_URL = variables.backendURL;

  return variables;
};

export default useVariables;
