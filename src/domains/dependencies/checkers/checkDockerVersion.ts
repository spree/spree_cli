import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkDockerVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('docker --version', versionString, extractVersion);
};

export default checkDockerVersion;
