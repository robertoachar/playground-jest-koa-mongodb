import checkString from './checkString';

const checkObjectId = (value, message) => {
  checkString(value, message);

  const regex = new RegExp('^[0-9a-fA-F]{24}$');
  const match = value.match(regex);

  if (!match) {
    throw new Error(message);
  }

  return true;
};

export default checkObjectId;
