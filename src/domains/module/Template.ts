export interface Template {
  name: string;
  gitRepositoryURL?: string;
  gitRef?: string
  documentationURL?: string;
  buildScriptURL?: string;
  dependencies?: Record<string, string>;
  samples?: {
    buildScriptURL?: string;
  }
}

export default Template;
