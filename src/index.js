const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/mevn-database')
	.then(res => console.log('DB is connected'))
	.catch(err => console.log(err));

// --- Settings
app.set('port', process.env.PORT || 3000);

// --- Middlewares
app.use(morgan('dev'));
app.use(express.json());

// --- Routes
app.use('/api/products', require('./routes/products'));

// --- Static files
app.use(express.static(path.join(__dirname, 'public')));

// --- Server is listening
app.listen(app.get('port'), () => {
	console.log('Server on port ' + app.get('port'));
});