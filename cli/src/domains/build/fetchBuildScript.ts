import fetch from 'node-fetch';
import type BuildScript from './BuildScript';

const fetchBuildScript = async (buildStringURL: string): Promise<BuildScript> => {
  const response = await fetch(buildStringURL);
  return response.json() as Promise<BuildScript>;
};

export default fetchBuildScript;
