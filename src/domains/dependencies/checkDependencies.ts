import type CheckDependency from './CheckDependency';
import checkDockerVersion from './checkDockerVersion';
import checkRubyVersion from './checkRubyVersion';
import type DependencyCheckResult from './VersionCheckResult';

type SupportedDependency = 'ruby' | 'docker';

const dependencyMapping: Record<SupportedDependency, CheckDependency> = {
  ruby: checkRubyVersion,
  docker: checkDockerVersion
};

const checkDependency = async (dependencyName: string, versionString: string): Promise<DependencyCheckResult> => {
  if (Object.keys(dependencyMapping).includes(dependencyName)) {
    return await dependencyMapping[dependencyName as SupportedDependency](versionString);
  } else {
    throw new Error(`Unsupported dependency ${dependencyName}`);
  }
};

export default checkDependency;
