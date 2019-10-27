const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

// allowing cross origin request
app.use(cors());


//connection to database using MLAB
mongoose.connect(
  'mongodb://aamir:test12345@ds237588.mlab.com:37588/graphqlaamir',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.connection.once('open', () => {
  console.log('Connected to MLAB DataBase');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log("We are up on port 4000");
});