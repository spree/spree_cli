import type CheckDependency from './../CheckDependency';
import extractVipsVersion from './../versionExtractors/extractVipsVersion';
import checkVersionByShellCommand from './../checkVersionByShellCommand';

const checkVipsVersion: CheckDependency = async (versionString: string) => {
  return await checkVersionByShellCommand('vips --version', versionString, extractVipsVersion);
};

export default checkVipsVersion;
