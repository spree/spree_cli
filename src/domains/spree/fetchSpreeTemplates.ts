import fetch from 'node-fetch';

import type { Spree } from '.';
import { API_URL } from '../constants';

const URL = `${API_URL}/spree/data.json`;

type SpreeResponse = Omit<Spree, 'buildScriptURL'> & { buildScriptPath: string }

const fetchSpreeTemplates = async (): Promise<Spree[]> => {
  const response = await fetch(URL);
  const data = (await response.json()) as SpreeResponse[];
  return data.map(({buildScriptPath, ...rest}) => ({
    ...rest,
    buildScriptURL: API_URL.concat(buildScriptPath)
  })) as Spree[];
};

export default fetchSpreeTemplates;