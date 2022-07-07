import fetch from 'node-fetch';

import type { Integration } from '.';
import { API_URL } from '../constants';

const URL = `${API_URL}/integrations/data.json`;

const fetchIntegrations = async (): Promise<Integration[]> => {
  const response = await fetch(URL);
  return response.json() as Promise<Integration[]>;
};

export default fetchIntegrations;
