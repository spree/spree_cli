import fetch from 'node-fetch';

import type RunScript from './RunScript';
import { API_URL } from '../constants';

const getRunScript = async (scriptPath: string): Promise<RunScript> => {
  const URL = `${API_URL}${scriptPath}`;
  const response = await fetch(URL, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  return response.text() as Promise<RunScript>;
};

export default getRunScript;
