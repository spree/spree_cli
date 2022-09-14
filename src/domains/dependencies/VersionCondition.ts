import type ComparisonResult from './ComparisonResult';

type VersionCondition = {
  expectedVersion: string | string[];
  expectedComparisonResults: ComparisonResult[] | ComparisonResult[][];
};

export default VersionCondition;
