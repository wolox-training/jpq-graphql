const logger = require('../../logger');
const { decodeToken } = require('../../helpers/jwt');
const { userAlbum: userAlbumModel } = require('../../models');
const { badRequest } = require('../../errors');

const buyAlbum = async (resolve, root, args, context) => {
  logger.info("Middleware for 'buyAlbum' mutation");

  const { id } = args;
  const token = context.req.get('Authorization');

  if (token) {
    const onlyToken = token.split(' ')[1];
    const payload = decodeToken(onlyToken);

    args.user = payload;

    const userAlbum = await userAlbumModel.getOne({ user_id: payload.userId, album_id: id });

    if (userAlbum !== null) {
      throw badRequest('This album was already bought for by user');
    }

    return resolve(root, args);
  }

  throw badRequest('Authorization header is required field');
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  Mutation: {
    buyAlbum
  },
  User: {}
};
