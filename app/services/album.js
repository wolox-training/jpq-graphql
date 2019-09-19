const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { badRequest } = require('../errors');

exports.getAlbum = async params => {
  const { id } = params;

  try {
    const album = await requestPromise(`${endpointJsonPlaceholder}/albums/${id}`, { json: true });
    const photos = await requestPromise(`${endpointJsonPlaceholder}/photos?albumId=${id}`, { json: true });
    const user = await requestPromise(`${endpointJsonPlaceholder}/users/${album.userId}`, { json: true });

    return {
      id: album.id,
      title: album.title,
      artist: user.name,
      photos
    };
  } catch (error) {
    throw badRequest(error.message);
  }
};
