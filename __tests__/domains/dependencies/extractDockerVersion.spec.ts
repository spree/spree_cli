import extractDockerVersion from '../../../src/domains/dependencies/extractDockerVersion';

describe('extractDockerVersion | unit tests', () => {
  it('extracts version from a docker 20.10.12 output on mac', async () => {
    const output = 'Docker version 20.10.12, build e91ed57';

    const result = extractDockerVersion(output);
    expect(result).toEqual('20.10.12');
  });

  it('extracts version from a docker ce 18.06.1 output', async () => {
    const output = 'Docker version 18.06.1-ce, build e68fc7a';

    const result = extractDockerVersion(output);
    expect(result).toEqual('18.06.1');
  });

  it('throws an exception when output is invalid', async () => {
    const output = 'bash: command not found';

    expect(() => {
      extractDockerVersion(output);
    }).toThrowError('Invalid output');
  });

  it('throws an exception when output is empty', async () => {
    const output = '';

    expect(() => {
      extractDockerVersion(output);
    }).toThrowError('Invalid output');
  });
});
