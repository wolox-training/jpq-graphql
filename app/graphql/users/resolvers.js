const { user: User } = require('../../models'),
  { userLoggedIn } = require('../events');
const { createToken } = require('../../helpers/jwt');

const getUser = (_, params) => User.getOne(params);
const getUsers = (_, params) => User.getAll(params);

const createUser = (_, { user }) => User.createModel(user);
const logIn = (_, { user }) => {
  // IMPORTANT: Not a functional login, its just for illustrative purposes
  userLoggedIn.publish(user.email);

  return createToken(user);
};

module.exports = {
  Query: {
    user: getUser,
    users: getUsers
  },
  Mutation: {
    user: createUser,
    login: logIn
  },
  Subscription: {
    onLogin: {
      subscribe: userLoggedIn.iter
    }
  },
  User: {
    email: root => root.email
  }
};
