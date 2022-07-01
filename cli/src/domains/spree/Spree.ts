import type { Template } from '../module';

type Spree = Template & {
  version: string;
  documentationURL?: string;
};

export default Spree;
