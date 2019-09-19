const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: ID!): Album
    albums(filter: String, offset: Int, limit: Int, orderBy: String): [Album]
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