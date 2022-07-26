import { notEmpty } from '../../../src/domains/typescript';

describe('notEmpty | unit test', () => {
  it('returns false on null', async () => {
    expect(notEmpty(null)).toBeFalsy();
  });

  it('returns false on undefined', async () => {
    expect(notEmpty(undefined)).toBeFalsy();
  });

  it('filters only null and undefined', async () => {
    type TestData = { a?: string; b: string | null };
    const data: TestData[] = [
      { a: 'a', b: 'b' },
      { a: '', b: '' },
      { a: 'a', b: '' },
      { a: '', b: 'b' },
      { a: 'a', b: null },
      { b: 'b' },
      { b: null }
    ].filter(
      (el) => notEmpty<TestData['a']>(el.a) && notEmpty<TestData['b']>(el.b)
    );
    expect(data).toEqual([
      { a: 'a', b: 'b' },
      { a: '', b: '' },
      { a: 'a', b: '' },
      { a: '', b: 'b' }
    ]);
  });
});
