import type CheckDependency from './../CheckDependency';
import extractVersion from './../extractVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkRubyVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('ruby --version', versionString, extractVersion);
};

export default checkRubyVersion;
