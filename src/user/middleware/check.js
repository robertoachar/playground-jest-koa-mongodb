import User from '../user.model';
import { checkObjectId } from '../../utils/validation';

const check = async (ctx, next) => {
  const { id } = ctx.params;

  checkObjectId(id, 'Invalid id');

  const user = await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  await next();
};

export default check;
