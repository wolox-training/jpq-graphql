const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  { user: User } = models;

factory.define('user', User, {
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email(null, null, 'wolox.com.ar'),
  password: () => faker.random.alphaNumeric(8)
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params)
};
