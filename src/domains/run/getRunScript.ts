import { RunScript, fetchRunScript } from '.';

const getRunScript = async (runScriptPath: string): Promise<RunScript> => {
  return await fetchRunScript(runScriptPath);
};

export default getRunScript;
