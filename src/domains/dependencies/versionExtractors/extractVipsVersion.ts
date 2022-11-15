import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^vips-(\d+\.\d+\.\d+).*$/;

const extractVipsVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractVipsVersion;
