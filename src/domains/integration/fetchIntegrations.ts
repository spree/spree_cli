import fetch from 'node-fetch';

import type { Integration } from '.';
import { API_URL } from '../constants';

const URL = `${API_URL}/integrations/data.json`;

type IntegrationResponse = Omit<Integration, 'buildScriptURL'>
  & { buildScriptPath: string, runScriptPath: string }

const fetchIntegrations = async (): Promise<Integration[]> => {
  const response = await fetch(URL);
  const data = (await response.json()) as IntegrationResponse[];
  return data.map(({buildScriptPath, runScriptPath, ...rest}) => ({
    ...rest,
    buildScriptURL: API_URL.concat(buildScriptPath),
    runScriptURL: API_URL.concat(runScriptPath)
  })) as Integration[];
};

export default fetchIntegrations;
