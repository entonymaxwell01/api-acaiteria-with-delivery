const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


app.use(cors());

app.use(express.json());

// Connection to MongoDB

const connect = require('./database/connection.js');

connect();

// Routers

const routes = require('./routes/index.routes.js');

app.use('/', routes);


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

