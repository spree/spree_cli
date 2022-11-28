import type DependencyCheckResult from './VersionCheckResult';
import checkVersionByShellCommand from './checkVersionByShellCommand';

type SupportedDependency = 'ruby' | 'docker' | 'vips' | 'gpg' | 'psql' | 'redis' | 'docker-compose' | 'node' | 'yarn';

const dependencyMapping: Record<SupportedDependency, string> = {
  ruby: 'ruby --version',
  docker: 'docker --version',
  'docker-compose': 'docker-compose --version',
  vips: 'vips --version',
  gpg: 'gpg --version',
  psql: 'psql --version',
  redis: 'redis-server --version',
  node: 'node -v',
  yarn: 'yarn --version'
};

const checkDependency = async (dependencyName: string, versionString: string): Promise<DependencyCheckResult> => {
  if (Object.keys(dependencyMapping).includes(dependencyName)) {
    return await checkVersionByShellCommand(dependencyMapping[dependencyName as SupportedDependency], versionString);
  } else {
    throw new Error(`Unsupported dependency ${dependencyName}`);
  }
};

export default checkDependency;
