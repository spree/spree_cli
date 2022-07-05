import type { Variables } from '.';
import type { Diff } from '../typescript';

const defaultVariables: Omit<Variables, 'projectName'> = {
  pathBackend: '/backend',
  pathIntegration: '/integration'
};

type UserVariables = Partial<typeof defaultVariables> &
  Pick<Variables, Diff<keyof Variables, keyof typeof defaultVariables>>;

const useVariables = (userVariables: UserVariables): Variables => {
  const variables = { ...defaultVariables, ...userVariables };
  process.env.SPREE_CLI_PATH_BACKEND = variables.pathBackend;
  process.env.SPREE_CLI_PATH_INTEGRATION = variables.pathIntegration;
  process.env.SPREE_CLI_PROJECT_NAME = variables.projectName;

  return variables;
};

export default useVariables;
