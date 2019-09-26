const album = require('../../services/album');

const getAlbum = (_, params) => album.getAlbum(params);
const getAlbums = (_, params) => album.getAlbums(params);
// eslint-disable-next-line no-unused-vars
const buyAlbum = (obj, params, context) => album.buyAlbum(params);

module.exports = {
  Query: {
    album: getAlbum,
    albums: getAlbums
  },
  Mutation: {
    buyAlbum
  }
};
