import extractVersionByRegExp from './extractVersionByRegExp';

const versionRegExp = /^v(\d+\.\d+\.\d+)$/;

const extractNodeVersion = (output: string): string => {
  console.log(output)
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractNodeVersion;
