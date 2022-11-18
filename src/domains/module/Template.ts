export interface Template {
  name: string;
  gitRepositoryURL?: string;
  gitRef?: string
  documentationURL?: string;
  buildScriptURL?: string;
  runScriptPath?: string;
  runScriptURL?: string;
  runScriptLocalPath?: string;
  dependencies?: Record<string, string>;
  samples?: {
    buildScriptURL?: string;
  }
}

export default Template;
