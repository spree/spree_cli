const extractVersionByRegExp = (output: string, regExp: RegExp): string => {
  const regexResult = output.trim().match(regExp);

  if (!regexResult || !regexResult[0]) {
    throw new Error('Invalid output');
  }
  return regexResult[0];
};

export default extractVersionByRegExp;
