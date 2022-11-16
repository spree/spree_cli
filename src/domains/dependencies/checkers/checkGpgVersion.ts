import type CheckDependency from './../CheckDependency';
import extractGpgVersion from './../versionExtractors/extractGpgVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkGpgVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('gpg --version', versionString, extractGpgVersion);
};

export default checkGpgVersion;
