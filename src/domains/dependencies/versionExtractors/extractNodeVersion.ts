import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^v(\d+\.\d+\.\d+)$/;

const extractNodeVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractNodeVersion;
