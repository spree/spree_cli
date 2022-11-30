const versionRegExp = /(\d+)(\.\d+)(\.\d+)?/g;

const extractVersion = (versionString: string): string => {
  const regexResult = versionString.trim().match(versionRegExp);

  if (!regexResult || !regexResult[0]) {
    throw new Error(`Invalid version string: ${versionString}`);
  }
  return regexResult[0];
};

export default extractVersion;
