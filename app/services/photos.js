const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;

exports.getPhotosOfAlbum = albumId =>
  requestPromise(`${endpointJsonPlaceholder}/photos?albumId=${albumId}`, { json: true });
