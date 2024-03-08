const dotenv = require("dotenv");
dotenv.config();
// ----------------------------

// Database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, console.log("db connected")).then("mongo sussess").catch("somrthing wrong");
// ----------------------------

//expess
const express = require("express");
const app = express();
const nocache = require("nocache");
const morgan = require('morgan');
const session = require('express-session')

//Morgan
const customFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(customFormat));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));

app.use(nocache());

// bodyParser
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


const userRoutes = require('./routes/userRoute');
app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('Server running...')
});
