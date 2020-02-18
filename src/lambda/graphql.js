const { ApolloServer, gql } = require("apollo-server-lambda");

const LETTINGS = [{
    id: 'A001',
    name: 'One',
    price: 200,
    location: {
        latitude: 1,
        longitude: 1
    }
},
{
    id: 'A002',
    name: 'Two',
    price: 300,
    location: {
        latitude: 1,
        longitude: 1
    }
}]

const typeDefs = gql`
  type Query {
    hello: String
    lettings: [Letting]
  }

  type Letting {
      id: String!
      name: String!
      price: Float!
      location: Location!
  }

  type Location {
      latitude: Float!
      longitude: Float!
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return "Hello, world!";
    },

    lettings: (parent, arg, context) => {
        return LETTINGS
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();