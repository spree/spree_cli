import fetch from 'node-fetch';
import type { Spree } from '.';

const API_URL = 'https://raw.githubusercontent.com/upsidelab/spree_starter/main/cli-data/spree/data.json';

const fetchSpreeTemplates = async (): Promise<Spree[]> => {
  const response = await fetch(API_URL);
  return response.json() as Promise<Spree[]>;
};

export default fetchSpreeTemplates;
