import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^Docker Compose version v(\d+\.\d+(\.\d)?).*$/;

const extractDockerComposeVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractDockerComposeVersion;
