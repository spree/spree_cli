import type { Template } from '.';

export interface Module {
  path: string;
  absolutePath: string;
  template: Template;
  buildOptions?: Record<string, any>;
}

export default Module;
