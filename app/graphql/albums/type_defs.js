const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: ID!): Album
    albums(offset: Int = 1, limit: Int = 10, orderBy: String = "id"): [Album]
  }
`;

const customTypes = gql`
  type Album {
    id: ID!
    title: String!
    artist: String
    photos: [Photo]
  }
`;

exports.typeDefs = [rootTypes, customTypes];
