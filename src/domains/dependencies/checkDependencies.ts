import type CheckDependency from './CheckDependency';
import checkDockerVersion from './checkers/checkDockerVersion';
import checkDockerComposeVersion from './checkers/checkDockerComposeVersion';
import checkRubyVersion from './checkers/checkRubyVersion';
import checkVipsVersion from './checkers/checkVipsVersion';
import checkGpgVersion from './checkers/checkGpgVersion';
import checkPostgresVersion from './checkers/checkPostgresVersion';
import checkRedisVersion from './checkers/checkRedisVersion';
import checkNodeVersion from './checkers/checkNodeVersion';
import checkYarnVersion from './checkers/checkYarnVersion';
import type DependencyCheckResult from './VersionCheckResult';

type SupportedDependency = 'ruby' | 'docker' | 'vips' | 'gpg' | 'psql' | 'redis' | 'docker-compose' | 'node' | 'yarn';

const dependencyMapping: Record<SupportedDependency, CheckDependency> = {
  ruby: checkRubyVersion,
  docker: checkDockerVersion,
  'docker-compose': checkDockerComposeVersion,
  vips: checkVipsVersion,
  gpg: checkGpgVersion,
  psql: checkPostgresVersion,
  redis: checkRedisVersion,
  node: checkNodeVersion,
  yarn: checkYarnVersion,
};

const checkDependency = async (dependencyName: string, versionString: string): Promise<DependencyCheckResult> => {
  if (Object.keys(dependencyMapping).includes(dependencyName)) {
    return await dependencyMapping[dependencyName as SupportedDependency](versionString);
  } else {
    throw new Error(`Unsupported dependency ${dependencyName}`);
  }
};

export default checkDependency;
