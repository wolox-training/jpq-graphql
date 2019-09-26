const { query } = require('../server.spec'),
  { getAlbum } = require('./graphql');

describe('albums', () => {
  describe('queries', () => {
    it('should return undefinded when fetching a non existing album', () =>
      query(getAlbum(1)).then(res => {
        expect(res.data).toBeUndefined();
      }));
  });
});
