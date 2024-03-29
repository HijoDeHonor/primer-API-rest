const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')//esta


//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());//esta
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS configuration
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Permitir acceso desde cualquier origen
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


// Routes
app.use(require('./routes/index'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));


//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
