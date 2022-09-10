const versionRegex = /^ruby (\d+\.\d+\.\d+)p.*$/;

const extractRubyVersion = (output: string): string => {
  const regexResult = output.match(versionRegex);

  if (!regexResult || !regexResult[1]) {
    throw new Error('Invalid output');
  }
  return regexResult[1];
};

export default extractRubyVersion;
