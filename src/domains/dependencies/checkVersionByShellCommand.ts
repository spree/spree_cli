import { promisify } from 'util';
import { exec } from 'child_process';
import parseVersionCondition from './parseVersionCondition';
import compareVersions from './compareVersions';
import type DependencyCheckResult from './VersionCheckResult';

const execute = promisify(exec);

const checkVersionByShellCommand = async (command: string, versionString: string, extractVersionFn: (output: string) => string): Promise<DependencyCheckResult> => {
  try {
    const result = await execute(command);
    const output = result.stdout;

    const currentVersion = extractVersionFn(output);

    const versionCondition = parseVersionCondition(versionString);
    const compareResult = compareVersions(currentVersion, versionCondition.expectedVersion);

    if (versionCondition.expectedComparisonResults.includes(compareResult) === true) {
      return {
        status: 'OK',
        versionRequired: versionString,
        versionFound: currentVersion
      };
    } else {
      return {
        status: 'VERSION_MISMATCH',
        versionRequired: versionString,
        versionFound: currentVersion
      };
    }
  } catch (e) {
    return {
      status: 'NOT_FOUND',
      versionRequired: versionString
    };
  }
};

export default checkVersionByShellCommand;
