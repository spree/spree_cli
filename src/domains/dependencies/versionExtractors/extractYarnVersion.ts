import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^.*(\d+\.\d+\.\d+).*$/;

const extractYarnVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractYarnVersion;
