const album = require('../../services/album');
const { getPhotosOfAlbum } = require('../../services/photos');
const { getArtistByAlbum } = require('../../services/artists');

const getAlbum = (_, params) => album.getAlbum(params);
const getAlbums = (_, params) => album.getAlbums(params);
const getPhotos = ({ id }) => getPhotosOfAlbum(id);
const getArtist = ({ userId }) => getArtistByAlbum(userId);
// eslint-disable-next-line no-unused-vars
const buyAlbum = (obj, params, context) => album.buyAlbum(params);

module.exports = {
  Query: {
    album: getAlbum,
    albums: getAlbums
  },
  Mutation: {
    buyAlbum
  },
  Album: {
    photos: getPhotos,
    artist: getArtist
  }
};
