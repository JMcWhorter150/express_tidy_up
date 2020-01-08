// modules
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');
const { stuff, users } = require('./models');

// sets up parseForm middleware to capture user POST data
const parseForm = bodyParser.urlencoded({
    extended: true
});

// sets up server
const app = express();
const PORT = 3000;
const server = http.createServer(app);

//es6Renderer
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

// sets base middleware
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

// sets routes
app.get('/', (req, res) => {
    console.log(stuff.all());
    res.send('Haaaayyyy!!!');
})

app.get('/create', (req, res) => {
    console.log('GET Request');
    console.log(stuff.all());
    res.render('form');
})

app.post('/create', parseForm, (req, res) => {
    console.log('POST request');
    console.log(req.body);
    const {name, givesJoy} = req.body;
    stuff.create(name, givesJoy);
    res.redirect('/create/success');
})

app.get('/create/success', (req, res) => {
    // setTimeout(500)
    res.redirect('/create');
})

app.get('/signup', (req, res) => {
    res.render('user-auth');
})

app.post('/signup', parseForm, (req, res) => {
    // console.log(req.body)
    const {username, password} = req.body;
    users.create(username, password);
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('user-auth');
})

app.post('/login', parseForm, (req, res) => {
    const { username, password } = req.body;
    const didLogin = users.verify(username, password);
    res.send(didLogin);
})

// causes server to run
server.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`)
});