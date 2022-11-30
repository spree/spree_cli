const versionRegExp = /(\d+)(\.\d+)(\.\d+)?/g;

const extractVersion = (versionString: string): string => {
  const regexResult = versionString.trim().match(versionRegExp);

  if (!regexResult || !regexResult[0]) {
    throw new Error('Invalid output');
  }
  return regexResult[0];
};

export default extractVersion;
