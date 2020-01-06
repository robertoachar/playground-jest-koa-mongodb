import User from '../user.model';
import { checkString } from '../../utils/validation';

const create = async ctx => {
  const { name } = ctx.request.body;

  checkString(name, 'Enter a name');

  const existingUser = await User.findOne({ name });
  if (existingUser) throw new Error('User already exists');

  const user = new User({ name });

  await user.save();

  ctx.body = user;
};

export default create;
