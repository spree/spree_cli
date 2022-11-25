import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkRedisVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('redis-server --version', versionString, extractVersion);
};

export default checkRedisVersion;
