require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger, logEvents } = require('./middlewares/logEvents')
const { errorHandler } = require('./middlewares/errorHandler')
const verifyJWT = require('./middlewares/verifyJWT')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const credentials = require('./middlewares/credentials')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

connectDB()
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json({ limit:'10mb'}))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: true }))
app.use(cookieParser())

// Serve css from public folder
app.use('/', express.static(path.join(__dirname, "/public")))

// Routes
app.use("/", require('./routes/root'))
//Auth & Register routes
app.use("/register", require('./routes/auth/register'))
app.use("/auth", require('./routes/auth/auth'))
//Refresh token route
app.use("/refresh", require('./routes/auth/refresh'))
//Logout route
app.use("/logout", require('./routes/auth/logout'))
///Projects routes
app.use("/api/projects", require('./routes/api/projects'))
///Users routes
app.use("/api/users", require('./routes/api/users'))
///Upload file routes
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")))




app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
        return
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not Found" })
        return
    } else {
        res.type('txt').send("404 Not Found")
        return
    }
})



app.use(errorHandler)

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
    logEvents("Server started", "access.log")
})
mongoose.connection.on('error', (err) => {
    console.log(err)
    logEvents(`${err.no}: ${err.name}\t${err.syscall}\t${err.hostname}`, 'mongoErrors.log')
})