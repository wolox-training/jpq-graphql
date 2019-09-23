const album = require('../../services/album');

const getAlbum = (_, params) => album.getAlbum(params);
const getAlbums = (_, params) => album.getAlbums(params);

module.exports = {
  Query: {
    album: getAlbum,
    albums: getAlbums
  }
};
