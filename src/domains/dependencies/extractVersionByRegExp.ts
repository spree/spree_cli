const extractVersionByRegExp = (output: string, regExp: RegExp): string => {
  const regexResult = output.trim().match(regExp);

  if (!regexResult || !regexResult[1]) {
    throw new Error('Invalid output');
  }
  return regexResult[1];
};

export default extractVersionByRegExp;
