const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    firstName: {
        type: String,
        required: true,
    
    },
    lastName: {
        type: String,
        required: true,
    
    }
})


module.exports = mongoose.model('User', userSchema)