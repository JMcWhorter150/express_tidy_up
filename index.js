// modules
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

// sets up parseForm ability
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
    res.send('Haaaayyyy!!!');
})

app.get('/create', (req, res) => {
    console.log('GET Request');
    res.render('form');
})

app.post('/create', parseForm, (req, res) => {
    console.log('POST request');
    console.log(req.body);
    res.redirect('/create/success');
})

app.get('/create/success', (req, res) => {
    res.send('success');
})

// causes server to run
server.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`)
});