import type { Template } from '../module';

type Integration = Template & {
  documentationURL?: string;
};

export default Integration;
