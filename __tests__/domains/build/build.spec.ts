import type { BuildScript } from 'cli/src/domains/build';

type Assert<A, B> = [B] extends [A] ? true : false;

describe('BuildScript | type tests', () => {
  it('defines a string', () => {
    expect<Assert<BuildScript, string>>(true).toBe(true);
  });
});
