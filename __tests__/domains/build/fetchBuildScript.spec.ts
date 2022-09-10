import { fetchIntegrations } from '../../../src/domains/integration';
import { notEmpty } from '../../../src/domains/typescript';
import { BuildScript, fetchBuildScript } from '../../../src/domains/build';

describe('fetchBuildScript | integration tests', () => {
  it('fetches the build script for integration', async () => {
    const integrations = await fetchIntegrations();

    const buildScripts = await Promise.all(
      integrations
        .map(i => i.buildScriptURL)
        .filter(notEmpty<BuildScript>)
        .map(fetchBuildScript)
    );

    buildScripts.forEach((script) => {
      expect(script).not.toBe('');
    });
  });
});
