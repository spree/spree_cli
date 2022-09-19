export interface Template {
  name: string;
  gitRepositoryURL?: string;
  documentationURL?: string;
  buildScriptURL?: string;
  runScriptPath?: string;
  dependencies?: Record<string, string>;
}

export default Template;
