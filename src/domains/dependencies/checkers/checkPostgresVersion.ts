import type CheckDependency from './../CheckDependency';
import extractPostgresVersion from './../versionExtractors/extractPostgresVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkPostgresVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('psql --version', versionString, extractPostgresVersion);
};

export default checkPostgresVersion;
