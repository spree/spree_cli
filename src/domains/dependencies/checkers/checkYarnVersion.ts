import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkYarnVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('yarn --version', versionString, extractVersion);
};

export default checkYarnVersion;
