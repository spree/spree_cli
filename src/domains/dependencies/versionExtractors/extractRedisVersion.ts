import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^.*v=(\d+\.\d+(\.\d)?).*$/;

const extractRedisVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractRedisVersion;
