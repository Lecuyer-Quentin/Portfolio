const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    roles: {
        User: {
            type: Number,
            default: 1
        },
        Admin: {
            type: Number,
            default: 2
        }
    },
    // roles: {
    //     type: Object,
    //     default: {
    //         User: 1,
    //         Admin: 2
    //     },

    // },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    }

})

module.exports = mongoose.model('User', userSchema)


