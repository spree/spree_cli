import type CheckDependency from './../CheckDependency';
import extractRubyVersion from './../versionExtractors/extractRubyVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkRubyVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('ruby --version', versionString, extractRubyVersion);
};

export default checkRubyVersion;
