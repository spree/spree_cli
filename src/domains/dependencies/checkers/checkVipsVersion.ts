import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkVipsVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('vips --version', versionString, extractVersion);
};

export default checkVipsVersion;
