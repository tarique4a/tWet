require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const PORT = process.env.PORT || 5000;

// Database
const mongodb=process.env.mongodb;
const mongoose = require("mongoose");

// Graph QL
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected!");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });