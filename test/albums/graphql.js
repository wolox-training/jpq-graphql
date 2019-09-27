const { gql } = require('apollo-server');

const getAlbum = id => gql`
    query {
        album(id: ${id}) {
          id
          title
          artist
          photos
        }
      }`;

const getAlbums = () => gql`
  query {
    albums {
      id
      title
      artist
      photos
    }
  }
`;

module.exports = { getAlbum, getAlbums };
