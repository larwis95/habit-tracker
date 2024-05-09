const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const expressHandleBars = require('express-handlebars');
const handleBarHelpers = require('./libs/handlebars_helpers/helpers');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const PORT = process.env.PORT || 3001;

const routes = require('./controllers');

const app = express();

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnlly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(expressSession(session));

const handleBars = expressHandleBars.create({ helpers: handleBarHelpers });

app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

