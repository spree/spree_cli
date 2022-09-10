import { BuildScript, fetchBuildScript } from '.';

const getBuildScript = async (buildScriptURL: string): Promise<BuildScript> => {
  return await fetchBuildScript(buildScriptURL);
};

export default getBuildScript;
