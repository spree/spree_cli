export interface Template {
  name: string;
  gitRepositoryURL?: string;
  gitRef?: string
  documentationURL?: string;
  buildScriptURL?: string;
  dependencies?: Record<string, string>;
}

export default Template;
