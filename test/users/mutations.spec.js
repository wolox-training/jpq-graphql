const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, id } = res.data.user;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(password).toBeDefined();
          expect(id).toBeDefined();
        })
      ));
  });
});
