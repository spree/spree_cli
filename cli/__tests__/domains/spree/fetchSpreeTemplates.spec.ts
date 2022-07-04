import { fetchSpreeTemplates } from '../../../src/domains/spree';

describe('fetchSpreeTemplates | integration tests', () => {
  it('fetches the spree templates list', async () => {
    const templates = await fetchSpreeTemplates();

    expect(templates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          gitRepositoryURL: expect.any(String),
          buildScriptURL: expect.any(String)
        })
      ])
    );
  });
});
