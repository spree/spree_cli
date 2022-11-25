import extractVersionByRegExp from './extractVersionByRegExp';

const versionRegExp = /(\d+)(\.\d+)(\.\d+)?/g;

const extractVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractVersion;