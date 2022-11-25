import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkPostgresVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('psql --version', versionString, extractVersion);
};

export default checkPostgresVersion;
