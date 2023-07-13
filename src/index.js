const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override');
const localsMiddleware = require('./app/middlewares/localsMiddleware');
const isAuthenticated = require('./app/middlewares/isAuthenticated'); 
const configEngine = require('./config/configEngine');
//const verifyJWT = require('./app/middlewares/verifyJWT');
const app = express();
const db = require('./config/db');
const Route = require('./routes');

require('dotenv').config();
const port = process.env.PORT;

// connect database
db.connect();

// create middleware (req.body) for request method POST, that allows the server to get and process data from the user
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// session (Session data is stored server-side.)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000}
  }));

// Custom middlewares
app.use(localsMiddleware);

//app.use(verifyJWT);
app.use(isAuthenticated);

// override request method POST 
app.use(methodOverride('_method'));

// HTTP logger, create middleware for logger request
app.use(morgan('combined'));

// Template engine and static file
configEngine(app);

// route
// action -----> dispatcher -------> function handler

// Route init
Route(app);

// connect to port, start server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
})