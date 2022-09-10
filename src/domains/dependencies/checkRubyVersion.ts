import { promisify } from 'util';
import { exec } from 'child_process';
import type CheckDependency from './CheckDependency';
import parseVersionCondition from './parseVersionCondition';
import compareVersions from './compareVersions';
import extractRubyVersion from './extractRubyVersion';

const execute = promisify(exec);

const checkRubyVersion: CheckDependency = async (versionString: string) => {
  try {
    const result = await execute('ruby --version');
    const output = result.stdout;

    const currentRubyVersion = extractRubyVersion(output);

    const versionCondition = parseVersionCondition(versionString);
    const compareResult = compareVersions(currentRubyVersion, versionCondition.expectedVersion);

    return versionCondition.expectedComparisonResults.includes(compareResult) !== undefined;
  } catch (e) {
    return false;
  }
};

export default checkRubyVersion;
