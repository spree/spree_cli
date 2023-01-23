import extractVersion from '../../../src/domains/dependencies/extractVersion';

describe('extractVersion | unit tests', () => {
  it('extracts version from a node 14.0.0', async () => {
    const output = 'v14.0.0';

    const result = extractVersion(output);
    expect(result).toEqual('14.0.0');
  });

  it('extracts version from a node 14.15.5', async () => {
    const output = 'v14.15.5';

    const result = extractVersion(output);
    expect(result).toEqual('14.15.5');
  });

  it('extracts version from a docker 20.10.12 output on mac', async () => {
    const output = 'Docker version 20.10.12, build e91ed57';

    const result = extractVersion(output);
    expect(result).toEqual('20.10.12');
  });

  it('extracts version from a docker ce 18.06.1 output', async () => {
    const output = 'Docker version 18.06.1-ce, build e68fc7a';

    const result = extractVersion(output);
    expect(result).toEqual('18.06.1');
  });

  it('extracts version from a ruby 3.0 output on mac', async () => {
    const output = 'ruby 3.0.0p0 (2020-12-25 revision 95aff21468) [x86_64-darwin21]';

    const result = extractVersion(output);
    expect(result).toEqual('3.0.0');
  });

  it('extracts version from a ruby 2.4.1 output on linux', async () => {
    const output = 'ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-linux]';

    const result = extractVersion(output);
    expect(result).toEqual('2.4.1');
  });

  it('throws an exception when output is invalid', async () => {
    const output = 'bash: command not found';

    expect(() => {
      extractVersion(output);
    }).toThrowError('Invalid version string: bash: command not found');
  });

  it('throws an exception when output is empty', async () => {
    const output = '';

    expect(() => {
      extractVersion(output);
    }).toThrowError('Invalid version string: ');
  });
});
