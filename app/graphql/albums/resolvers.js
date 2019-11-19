const album = require('../../services/album');
const { getPhotosOfAlbum } = require('../../services/photos');
const { getArtistByAlbum } = require('../../services/artists');

const getAlbum = (_, params) => album.getAlbum(params);
const getPhotos = ({ id }) => getPhotosOfAlbum(id);
const getArtist = ({ userId }) => getArtistByAlbum(userId);

module.exports = {
  Query: {
    album: getAlbum
  },
  Album: {
    photos: getPhotos,
    artist: getArtist
  }
};
