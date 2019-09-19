const album = require('../../services/album');

const getAlbum = (_, params) => album.getAlbum(params);

module.exports = {
  Query: {
    album: getAlbum
  }
};
