import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^ruby (\d+\.\d+\.\d+)p.*$/;

const extractRubyVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractRubyVersion;
