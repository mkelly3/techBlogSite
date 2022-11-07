
//requiring all paths and packages 

const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const path = require('path');

// helper function
const helpers = require('./utils/helper');


const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;


const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: { 
        maxAge: 86400
    },
     //session will not force the applicition to resave even if nothing has been modified
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);

 // turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});