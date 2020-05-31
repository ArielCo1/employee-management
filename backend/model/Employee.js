const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
    id: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    position: {
        type: String
    },
    dateOfBirth: {
        type: Date
    }
}, {
    collection: 'employees'
});

module.exports = mongoose.model('Employee', Employee);
