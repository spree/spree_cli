import { promisify } from 'util';
import { exec } from 'child_process';
import parseVersionCondition from './parseVersionCondition';
import compareVersions from './compareVersions';
import type DependencyCheckResult from './VersionCheckResult';
import type ComparisonResult from './ComparisonResult';

const execute = promisify(exec);

const checkVersionByShellCommand = async (command: string, versionString: string, extractVersionFn: (output: string) => string): Promise<DependencyCheckResult> => {
  try {
    const result = await execute(command);
    const output = result.stdout;

    const currentVersion = extractVersionFn(output);
    let compareResult
    const versionCondition = parseVersionCondition(versionString);
    if (Array.isArray(versionCondition.expectedVersion)) {
      let result: boolean[] = []
      const expectedComparisonResults = versionCondition.expectedComparisonResults as ComparisonResult[][]
      versionCondition.expectedVersion.forEach((value, index) => result.push(expectedComparisonResults[index]!.includes(compareVersions(currentVersion, value))))
      compareResult = result.every(item => item)
    } else {
      const expectedComparisonResults = versionCondition.expectedComparisonResults as ComparisonResult[]
      compareResult = expectedComparisonResults.includes(compareVersions(currentVersion, versionCondition.expectedVersion))
    }

    if (compareResult) {
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
