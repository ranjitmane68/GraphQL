const { ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  scalar Email
  scalar URL

  """
  An object that describes the characteristics of learning day
  """
  type LearningDay {
    "A ski day's unique identifier"
    ID: ID!
    date: Date!
    subject: String!
    Conditions: Conditions!
  }

  type Query {
    totalDays: Int!
    allDays: [LearningDay!]!
  }

  enum Conditions {
    Busy
    Available
    Tentative
  }

  type Mutation {
    addDay(input: AddDayInput!): LearningDay
    removeDay(id: ID!): RemoveDayPayload
  }

  type RemoveDayPayload {
    day: LearningDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  input AddDayInput {
    date: Date!
    subject: String!
    Conditions: Conditions!
  }

  type Subscription {
    newDay: LearningDay!
  }
`;
//resolvers return the data for the schema
//const resolvers = {};

const mocks = {
  Date: () => "3/10/24",
  String: () => "This is coming from mock data",
  Query: () => ({ allDays: () => [...new Array(5)] }),
};

//mocks: true mocks data in the schema so user dont have to worry about
//wiring up data sources
const server = new ApolloServer({
  typeDefs: typeDefs,
  mocks: mocks,
});

server.listen().then(({ url }) => {
  console.log(`server running at ${url}`);
});
