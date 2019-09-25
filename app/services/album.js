const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { badRequest } = require('../errors');

exports.getAlbum = ({ id }) => requestPromise(`${endpointJsonPlaceholder}/albums/${id}`, { json: true });

exports.getAlbums = async params => {
  const { filter, offset, limit, orderBy } = params;

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
