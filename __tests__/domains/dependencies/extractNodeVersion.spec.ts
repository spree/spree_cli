import extractNodeVersion from '../../../src/domains/dependencies/extractNodeVersion';

describe('extractNodeVersion | unit tests', () => {
  it('extracts version from a node 14.0.0', async () => {
    const output = 'v14.0.0';

    const result = extractNodeVersion(output);
    expect(result).toEqual('14.0.0');
  });

  it('extracts version from a node 14.15.5', async () => {
    const output = 'v14.15.5';

    const result = extractNodeVersion(output);
    expect(result).toEqual('14.15.5');
  });

  it('throws an exception when output is invalid', async () => {
    const output = 'bash: command not found';

    expect(() => {
      extractNodeVersion(output);
    }).toThrowError('Invalid output');
  });

  it('throws an exception when output is empty', async () => {
    const output = '';

    expect(() => {
      extractNodeVersion(output);
    }).toThrowError('Invalid output');
  });
});
