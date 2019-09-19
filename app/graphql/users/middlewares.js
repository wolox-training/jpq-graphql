const logger = require('../../logger');
const { encryptPassword } = require('../../helpers/bcrypt');

const createUser = (resolve, root, args) => {
  logger.info("Middleware for 'createUser' mutation");
  // Add different actions that you want to be executed before your resolver, i.e: input validation or caching

  const { password } = args.user;

  const hasshedPassword = encryptPassword(password);

  args.user.password = hasshedPassword;

  return resolve(root, args);
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  Mutation: {
    user: createUser
  },
  User: {}
};
