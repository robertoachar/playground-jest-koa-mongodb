import uuid from 'uuid';

import User from '../src/user/user.model';

const generateId = () => {
  const id = uuid.v4();

  const partialId = id.split('-')[0];

  return partialId;
};

const generateUser = data => {
  const user = {
    name: `User ${generateId()}`,
    ...data
  };

  return user;
};

const removeUsers = async () => {
  await User.deleteMany({});
};

export { generateUser, removeUsers };
