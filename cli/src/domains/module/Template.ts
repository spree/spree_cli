export interface Template {
  name: string;
  gitRepositoryURL?: string;
  documentationURL?: string;
  buildScriptURL?: string;
  inlineScript?: string;
}

export default Template;
