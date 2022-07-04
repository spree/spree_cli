import type { Spree } from '../../../src/domains/spree';

type Assert<A, B> = [B] extends [A] ? true : false;

describe('Spree | type tests', () => {
  it('defines an object with name, git repository URL, version and build script URL', () => {
    expect<
      Assert<
        Spree,
        {
          name: string;
          version: string;
          gitRepositoryURL: string;
          buildScriptURL: string;
        }
      >
    >(true).toBe(true);
  });
});
