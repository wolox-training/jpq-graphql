const requestPromise = require('request-promise');
const { endpointJsonPlaceholder } = require('../../config').common.externalApi;
const { badRequest } = require('../errors');
const { userAlbum } = require('../models');

const getAlbum = ({ id }) => requestPromise(`${endpointJsonPlaceholder}/albums/${id}`, { json: true });

const getAlbums = async params => {
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

const buyAlbum = async params => {
  const { id } = params;
  const { userId } = params.user;

  try {
    const album = await getAlbum({ id });

    userAlbum.createModel({ user_id: userId, album_id: id });

    return { title: `${album.title}` };
  } catch (error) {
    throw badRequest(error.message);
  }
};

module.exports = {
  getAlbum,
  getAlbums,
  buyAlbum
};
