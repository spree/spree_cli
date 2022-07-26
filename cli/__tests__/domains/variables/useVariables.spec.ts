import { useVariables } from '../../../src/domains/variables';

describe('useVariables | integration test', () => {
  it('sets PROJECT_NAME variable', async () => {
    const projectName = 'test';
    useVariables({ projectName });
    expect(process.env.SPREE_CLI_PROJECT_NAME).toEqual(projectName);
  });
  it('sets PATH_BACKEND variable', async () => {
    const projectName = 'test';
    const pathBackend = '/test';
    useVariables({ projectName, pathBackend });
    expect(process.env.SPREE_CLI_PATH_BACKEND).toEqual(pathBackend);
  });
  it('sets PATH_INTEGRATION variable', async () => {
    const projectName = 'test';
    const pathIntegration = '/test';
    useVariables({ projectName, pathIntegration });
    expect(process.env.SPREE_CLI_PATH_INTEGRATION).toEqual(pathIntegration);
  });
  it('sets SPREE_CLI_BACKEND_URL variable', async () => {
    const projectName = 'test';
    const backendURL = '/test';
    useVariables({ projectName, backendURL });
    expect(process.env.SPREE_CLI_BACKEND_URL).toEqual(backendURL);
  });
});
