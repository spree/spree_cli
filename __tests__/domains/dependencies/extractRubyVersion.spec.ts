import extractRubyVersion from '../../../src/domains/dependencies/extractRubyVersion';

describe('extractRubyVersion | unit tests', () => {
  it('extracts version from a ruby 3.0 output on mac', async () => {
    const output = 'ruby 3.0.0p0 (2020-12-25 revision 95aff21468) [x86_64-darwin21]';

    const result = extractRubyVersion(output);
    expect(result).toEqual('3.0.0');
  });

  it('extracts version from a ruby 2.4.1 output on linux', async () => {
    const output = 'ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-linux]';

    const result = extractRubyVersion(output);
    expect(result).toEqual('2.4.1');
  });

  it('throws an exception when output is invalid', async () => {
    const output = 'bash: command not found';

    expect(() => {
      extractRubyVersion(output);
    }).toThrowError('Invalid output');
  });

  it('throws an exception when output is empty', async () => {
    const output = '';

    expect(() => {
      extractRubyVersion(output);
    }).toThrowError('Invalid output');
  });
});
