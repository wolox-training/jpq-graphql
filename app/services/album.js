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

exports.getAlbums = async params => {
  const { filter, offset = 1, limit = 10, orderBy = 'id' } = params;

  try {
    const albums = await requestPromise(`${endpointJsonPlaceholder}/albums`, { json: true });

    let albumsPaginated = albums.slice((offset - 1) * limit, offset * limit);

    if (filter !== undefined) {
      albumsPaginated = albumsPaginated.filter(album => album.title === filter);
    }

    albumsPaginated.sort((a, b) => (a[orderBy] > b[orderBy] ? 1 : -1));

    return albumsPaginated;
  } catch (error) {
    throw badRequest(error.message);
  }
};
