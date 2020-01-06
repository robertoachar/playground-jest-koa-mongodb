import User from '../user.model';

const view = async ctx => {
  const { id } = ctx.params;

  const user = await User.findById(id);

  ctx.body = user;
};

export default view;
