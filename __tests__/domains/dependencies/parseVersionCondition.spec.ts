import parseVersionCondition from '../../../src/domains/dependencies/parseVersionCondition';

describe('parseVersionCondition | unit tests', () => {
  it('parses lower or equal version condition', () => {
    const versionString = '<= 3.0.0';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual('3.0.0');
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([-1, 0]));
  });

  it('parses lower version condition', () => {
    const versionString = '< 3.0.0';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual('3.0.0');
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([-1]));
  });

  it('parses equal version condition', () => {
    const versionString = '= 3.0.0';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual('3.0.0');
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([0]));
  });

  it('parses greater version condition', () => {
    const versionString = '> 3.0.0';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual('3.0.0');
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([1]));
  });

  it('parses greater or equal version condition', () => {
    const versionString = '>= 3.0.0';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual('3.0.0');
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([1, 0]));
  });

  it('parses inbeetwen version', () => {
    const versionString = '>= 14.15 <= 14.19';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual(['14.15', '14.19']);
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([[0, 1],[-1, 0]]));
  });

  it('uses equal as default version condition', () => {
    const versionString = '3.0.0';

    const result = parseVersionCondition(versionString);
    expect(result.expectedVersion).toEqual('3.0.0');
    expect(result.expectedComparisonResults).toEqual(expect.arrayContaining([0]));
  });

  it('throws an error when version condition is empty', () => {
    const versionString = '';

    expect(() => {
      parseVersionCondition(versionString);
    }).toThrowError('Invalid version condition');
  });

  it('throws an error when version condition contains additional components', () => {
    const versionString = '>= 3.0.0 test test test';

    expect(() => {
      parseVersionCondition(versionString);
    }).toThrowError('Invalid version condition');
  });

  it('throws an error when comparison type is not a valid operator', () => {
    const versionString = '3.0.0 test';

    expect(() => {
      parseVersionCondition(versionString);
    }).toThrowError('Invalid version condition');
  });
});
