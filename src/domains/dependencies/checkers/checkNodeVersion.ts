import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkNodeVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('node -v', versionString, extractVersion);
};

export default checkNodeVersion;
