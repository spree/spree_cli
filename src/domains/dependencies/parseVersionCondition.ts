import type ComparisonOperator from './ComparisonOperator';
import type ComparisonResult from './ComparisonResult';
import type VersionCondition from './VersionCondition';

const comparisonResultsMapping: Record<ComparisonOperator, ComparisonResult[]> = {
  '<': [-1],
  '<=': [-1, 0],
  '=': [0],
  '>': [1],
  '>=': [0, 1]
};

const parseVersionCondition = (versionString: string): VersionCondition => {
  const normalizedVersionString = versionString.trim();
  if (normalizedVersionString === '') {
    throw new Error('Invalid version condition');
  }

  const components = normalizedVersionString.split(' ');

  if (components.length === 0 || components.length > 2) {
    throw new Error('Invalid version condition');
  } else if (components.length === 1) {
    return {
      expectedVersion: components[0] as string,
      expectedComparisonResults: [0]
    };
  } else {
    const expectedComparisonResults = comparisonResultsMapping[components[0] as ComparisonOperator];
    if (!expectedComparisonResults) {
      throw new Error('Invalid version condition');
    }

    return {
      expectedVersion: components[1] as string,
      expectedComparisonResults: expectedComparisonResults
    };
  }
};

export default parseVersionCondition;
