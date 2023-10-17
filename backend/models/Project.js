const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        default: '',
    },
    images: {
        type: Array,
        default: [],
    },
    technologies: {
        type: Array,
        default: [],
    },
    link: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // updatedAt: Date,
},
    {
        timestamps: true,
    }

)


module.exports = mongoose.model('Project', projectSchema)