const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;

exports.getAlbum = ({ id }) => requestPromise(`${endpointJsonPlaceholder}/albums/${id}`, { json: true });

exports.getAlbums = () => requestPromise(`${endpointJsonPlaceholder}/albums`, { json: true });
