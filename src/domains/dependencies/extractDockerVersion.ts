import extractVersionByRegExp from './extractVersionByRegExp';

const versionRegExp = /^Docker version (\d+.\d+.\d+).*$/;

const extractDockerVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractDockerVersion;
