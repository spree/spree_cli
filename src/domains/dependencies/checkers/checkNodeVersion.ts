import type CheckDependency from './../CheckDependency';
import extractNodeVersion from './../versionExtractors/extractNodeVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkNodeVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('node -v', versionString, extractNodeVersion);
};

export default checkNodeVersion;
