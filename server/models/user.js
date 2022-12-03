const mongoose = require('mongoose')
const { isEmail } = require('validator')

const User = mongoose.model('Users', {
    firstName: {
        type: String,
        required: [true, 'FirstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'Invalid email format'],
        unique: true
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    addr: {
        type: Array,
    },
})

module.exports = User
