const allowedOrigins = require('./allowedOrigins');


// CORS options for express middleware  (!origin just for testing purposes)
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credential: true,
    // methods: 'GET,PUT,POST,DELETE',
    // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    optionsSuccessStatus: 200

}

module.exports = corsOptions;