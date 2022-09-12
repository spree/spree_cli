import type DependencyCheckResult from './VersionCheckResult';

type CheckDependency = (versionString: string) => Promise<DependencyCheckResult>;

export default CheckDependency;
