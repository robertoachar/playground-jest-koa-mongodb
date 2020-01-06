import User from '../user.model';

const remove = async ctx => {
  const { id } = ctx.params;

  const user = await User.findByIdAndDelete(id);

  ctx.body = user;
};

export default remove;
