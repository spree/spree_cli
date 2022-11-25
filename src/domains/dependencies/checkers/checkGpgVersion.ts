import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkGpgVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('gpg --version', versionString, extractVersion);
};

export default checkGpgVersion;
