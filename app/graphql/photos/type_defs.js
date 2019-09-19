const { gql } = require('apollo-server');

const customTypes = gql`
  type Photo {
    id: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;

exports.typeDefs = [customTypes];
