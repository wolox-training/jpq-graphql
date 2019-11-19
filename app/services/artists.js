const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;

exports.getArtistByAlbum = albumId =>
  requestPromise(`${endpointJsonPlaceholder}/users/${albumId}`, { json: true }).then(user => user.name);
