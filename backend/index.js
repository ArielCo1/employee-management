const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataBaseConfig = require('./database/db');
const index = express();
const employeeRoute = require('./routes/employee.route');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
        console.log('Database connected successfully ');
    },
    error => {
        console.log('Could not connected to database : ' + error);
    }
);

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({
    extended: false
}));
index.use(cors());

// Setting up static directory
index.use(express.static(path.join(__dirname, 'dist/employee-management-system')));

// RESTful API root
index.use('/api', employeeRoute);

// PORT
const port = process.env.PORT || 8000;

index.listen(port, () => {
    console.log('Connected to port ' + port);
});

index.use((req, res, next) => {
    next(createError(404));
});

// Index Route
index.get('/', (req, res) => {
    res.send('invalid endpoint');
});

index.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/employee-management-system/index.html'));
});

// error handler
index.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
