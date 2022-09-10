import type ComparisonResult from './ComparisonResult';

type VersionCondition = {
  expectedVersion: string;
  expectedComparisonResults: ComparisonResult[];
};

export default VersionCondition;
