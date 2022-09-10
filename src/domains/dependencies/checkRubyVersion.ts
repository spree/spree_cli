import type CheckDependency from './CheckDependency';
import extractRubyVersion from './extractRubyVersion';
import checkVersionByShellCommand from './checkVersionByShellCommand';

const checkRubyVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('ruby --version', versionString, extractRubyVersion);
};

export default checkRubyVersion;
