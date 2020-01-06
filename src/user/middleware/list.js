import User from '../user.model';

const list = async ctx => {
  const users = await User.find();

  ctx.body = users;
};

export default list;
