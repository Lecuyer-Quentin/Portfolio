const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const logId = uuid()
    const logTime = format(new Date(), "yyyy-MM-dd HH:mm:ss")
    const logData = `${logId}\t${logTime}\t${message}\n`
    // try to create logs folder if it doesn't exist
    try {
        if(!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
        }
        // append log data to log file
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logData)
    } catch (err) {
        console.log(err)
    }
}

const logger = async (req, res, next) => {
    const logMessage = `${req.method}\t${req.headers.origin}\t${req.url}`
    await logEvents(logMessage, "access.log")
    next()
}

module.exports = {
    logEvents,
    logger
}
