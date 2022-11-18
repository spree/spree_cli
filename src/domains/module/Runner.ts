import type { Module, Template } from '.';
import type { BuildScript } from '../build';

interface Runner {
  name: Template['name'];
  buildOptions: Module['buildOptions'];
  module?: string;
  buildScript?: BuildScript;
  runScript?: string;
}
export default Runner;
