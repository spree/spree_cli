import type CheckDependency from './../CheckDependency';
import extractDockerComposeVersion from './../versionExtractors/extractDockerComposeVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkDockerComposeVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('docker-compose --version', versionString, extractDockerComposeVersion);
};

export default checkDockerComposeVersion;
