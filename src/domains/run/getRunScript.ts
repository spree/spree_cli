import fetch from 'node-fetch';

import type RunScript from './RunScript';

const getRunScript = async (runScriptURL: string): Promise<RunScript> => {
  const response = await fetch(runScriptURL, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  return response.text() as Promise<RunScript>;
};

export default getRunScript;
