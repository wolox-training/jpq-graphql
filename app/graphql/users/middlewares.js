const logger = require('../../logger');
const { user: User } = require('../../models');
const { encryptPassword } = require('../../helpers/bcrypt');
const { signUpValidations } = require('../../helpers/signUpValidation');
const { badRequest } = require('../../errors');

const createUser = async (resolve, root, args) => {
  logger.info("Middleware for 'createUser' mutation");

  const { user } = args;

  try {
    await signUpValidations.validate(user);
  } catch (error) {
    logger.error(error.errors);
    throw badRequest(error.errors);
  }

  const { email, password } = user;

  const userFound = await User.getOne({ email });

  if (userFound !== null) {
    throw badRequest("User's email already exists");
  }

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
