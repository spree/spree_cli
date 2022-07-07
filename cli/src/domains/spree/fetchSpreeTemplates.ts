import fetch from 'node-fetch';

import type { Spree } from '.';
import { API_URL } from '../constants';

const URL = `${API_URL}/spree/data.json`;

const fetchSpreeTemplates = async (): Promise<Spree[]> => {
  const response = await fetch(URL);
  return response.json() as Promise<Spree[]>;
};

export default fetchSpreeTemplates;
