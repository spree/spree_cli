import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^gpg \(GnuPG\) (\d+\.\d+\.\d+).*$/s;

const extractGpgVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractGpgVersion;
