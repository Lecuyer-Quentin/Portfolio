const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    path: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString(),
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
})

module.exports = mongoose.model('Image', imageSchema)