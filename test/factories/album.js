const faker = require('faker');

exports.mockAlbum = {
  id: faker.random.number(),
  title: faker.lorem.words(),
  artist: faker.lorem.words(),
  photos: []
};
