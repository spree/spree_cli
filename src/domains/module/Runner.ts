import type { Module, Template } from '.';
import type { BuildScript } from '../build';

interface Runner {
  name: Template['name'];
  buildOptions: Module['buildOptions'];
  buildScript?: BuildScript;
}

export default Runner;
