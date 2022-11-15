import extractVersionByRegExp from './../extractVersionByRegExp';

const versionRegExp = /^psql \(PostgreSQL\) (\d+\.\d+(\.\d)?).*$/;

const extractPostgresVersion = (output: string): string => {
  return extractVersionByRegExp(output, versionRegExp);
};

export default extractPostgresVersion;
