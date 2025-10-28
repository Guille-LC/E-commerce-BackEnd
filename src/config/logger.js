import winston, { transports } from "winston";

// levels
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "http"}),
        new winston.transports.File({filename: './logger.log' ,level: "warn"})
    ]
})

export const addLogger = (req,res,next) => {
    req.logger = logger;
    req.logger.info(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString} ==> ${req.method} in ${req.url}`);
    next()
}