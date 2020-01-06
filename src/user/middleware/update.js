import User from '../user.model';
import { checkString } from '../../utils/validation';

const update = async ctx => {
  const { id } = ctx.params;
  const { name } = ctx.request.body;

  checkString(name, 'Enter a name');

  const existingUser = await User.findOne({ name, _id: { $ne: id } });
  if (existingUser) throw new Error('User already exists');

  const user = await User.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );

  ctx.body = user;
};

export default update;
