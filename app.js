const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1000;
const path = require('path');

const session = require('express-session');
const expressjsLayouts = require('express-ejs-layouts');

// Route
const userAuth = require('./src/routes/userAuth-routes');
const kegiatanRoute = require('./src/routes/todo-routes')

// Middlewares
app.use(express.urlencoded({ extended: true }));  // Parsing form data
app.use(express.json());  // Parsing JSON data (if needed)
app.use(session({
    secret: '0000',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Make sure to set this properly for production (secure cookies in HTTPS)
}));

// Static files and views setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(expressjsLayouts);
app.set('layout', 'layouts/main-layouts');

// Routes
app.use('/', userAuth);
app.use('/kegiatan', kegiatanRoute )

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
