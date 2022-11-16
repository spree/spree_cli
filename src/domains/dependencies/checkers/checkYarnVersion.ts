import type CheckDependency from './../CheckDependency';
import extractYarnVersion from './../versionExtractors/extractYarnVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkYarnVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('yarn --version', versionString, extractYarnVersion);
};

export default checkYarnVersion;
