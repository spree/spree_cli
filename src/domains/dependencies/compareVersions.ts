import type ComparisonResult from './ComparisonResult';

const componentsToNumbers = (components: string[]): number[] => {
  const result = components.map((e) => Number.parseInt(e, 10));

  if (!result.every((e) => Number.isInteger(e))) {
    throw new Error('Invalid version');
  }

  return result;
};

const compareVersions = (a: string, b: string): ComparisonResult => {
  const versionComponentsA = componentsToNumbers(a.split('.'));
  const versionComponentsB = componentsToNumbers(b.split('.'));

  const maxComponents = Math.max(versionComponentsA.length, versionComponentsB.length);

  for (let i = 0; i < maxComponents; i++) {
    const versionA = versionComponentsA[i] || 0;
    const versionB = versionComponentsB[i] || 0;

    if (versionA < versionB) {
      return -1;
    } else if (versionA > versionB) {
      return 1;
    }
  }

  return 0;
};

export default compareVersions;
