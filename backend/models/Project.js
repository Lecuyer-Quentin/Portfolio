const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    owner: {
        // type: Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        default: '',

    },
    image: {
        type: Array,

        default: [
            defaultImage = {
                'url': 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvamVjdCUyMHBsYXllciUyMHNob3BwaW5nJTIwY29sb3JmdWwlMjBzdGF0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                'pub': 'https://unsplash.com/@paulgilmore_',
                'alt': 'default image'
            }
        ],

        // type: String,
        // default: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvamVjdCUyMHBsYXllciUyMHNob3BwaW5nJTIwY29sb3JmdWwlMjBzdGF0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
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
    updatedAt: Date,
},
    {
        timestamps: true,
    }

)


module.exports = mongoose.model('Project', projectSchema)