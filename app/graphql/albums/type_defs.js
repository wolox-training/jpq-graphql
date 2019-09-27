const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: ID!): Album
    albums(filter: String, offset: Int = 1, limit: Int = 10, orderBy: String = "id"): [Album]
  }
  extend type Mutation {
    buyAlbum(id: ID!): buyAlbum
  }
`;

const customTypes = gql`
  type Album {
    id: ID!
    title: String!
    artist: String
    photos: [Photo]
  }

  type buyAlbum {
    title: String!
  }
`;

exports.typeDefs = [rootTypes, customTypes];
