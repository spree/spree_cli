import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkDockerComposeVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('docker-compose --version', versionString, extractVersion);
};

export default checkDockerComposeVersion;
