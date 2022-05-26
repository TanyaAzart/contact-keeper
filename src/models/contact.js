const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value){
            if (value && !validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        },
        required: false
    },
    phone: {
        type: String,
        trim: true,
        required: false
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'personal'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact