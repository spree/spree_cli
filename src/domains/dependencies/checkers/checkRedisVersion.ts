import type CheckDependency from './../CheckDependency';
import extractRedisVersion from './../versionExtractors/extractRedisVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkRedisVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('redis-server --version', versionString, extractRedisVersion);
};

export default checkRedisVersion;
