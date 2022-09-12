import compareVersions from '../../../src/domains/dependencies/compareVersions';

describe('compareVersions | unit tests', () => {
  it('returns 0 for equal versions', async () => {
    const a = '3.0.0';
    const b = '3.0.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(0);
  });

  it('returns 0 for equal versions when the first one is specified partially', async () => {
    const a = '3.0';
    const b = '3.0.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(0);
  });

  it('returns 0 for equal versions when the second one is specified partially', async () => {
    const a = '3.0.0';
    const b = '3.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(0);
  });

  it('returns 0 for equal versions when the first one is specified only with one number', async () => {
    const a = '3';
    const b = '3.0.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(0);
  });

  it('returns -1 when the first version is lower by a major version', async () => {
    const a = '2.0.0';
    const b = '3.0.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(-1);
  });

  it('returns -1 when the first version is lower by a major version', async () => {
    const a = '2.4.0';
    const b = '3.0.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(-1);
  });

  it('returns -1 when the first version is lower by a major version', async () => {
    const a = '2.4.2';
    const b = '3.0.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(-1);
  });

  it('returns -1 when the first version is lower by a minor version', async () => {
    const a = '3.0.0';
    const b = '3.1.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(-1);
  });

  it('returns -1 when the first version is lower by a minor version', async () => {
    const a = '3.0.1';
    const b = '3.1.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(-1);
  });

  it('returns -1 when the first version is lower by a patch version', async () => {
    const a = '3.1.0';
    const b = '3.1.1';

    const result = compareVersions(a, b);
    expect(result).toEqual(-1);
  });

  it('returns 1 when the first version is higher by a minor version', async () => {
    const a = '3.1.0';
    const b = '3.0.1';

    const result = compareVersions(a, b);
    expect(result).toEqual(1);
  });

  it('returns 1 when the first version is higher by a patch version', async () => {
    const a = '3.1.1';
    const b = '3.1.0';

    const result = compareVersions(a, b);
    expect(result).toEqual(1);
  });

  it('returns 1 when the first version is higher by a patch version and the version is multi digit', async () => {
    const a = '3.12.0';
    const b = '3.1.1';

    const result = compareVersions(a, b);
    expect(result).toEqual(1);
  });

  it('throws an exception when the first version is invalid', async () => {
    const a = 'test';
    const b = '3.0.0';

    expect(() => {
      compareVersions(a, b);
    }).toThrowError('Invalid version');
  });

  it('throws an exception when the second version is invalid', async () => {
    const a = '3.0.0';
    const b = 'test';

    expect(() => {
      compareVersions(a, b);
    }).toThrowError('Invalid version');
  });

  it('throws an exception when a version is empty', async () => {
    const a = '3.0.0';
    const b = '';

    expect(() => {
      compareVersions(a, b);
    }).toThrowError('Invalid version');
  });
});
