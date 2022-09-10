type DependencyCheckResult = {
  status: 'OK' | 'NOT_FOUND' | 'VERSION_MISMATCH';
  versionFound?: string;
  versionRequired: string;
}

export default DependencyCheckResult;
