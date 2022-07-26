import fetch from 'node-fetch';
import type BuildScript from './BuildScript';

const fetchBuildScript = async (buildStringURL: string): Promise<BuildScript> => {
  const response = await fetch(buildStringURL, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  return response.text() as Promise<BuildScript>;
};
export default fetchBuildScript;
