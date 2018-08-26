const {
    createLogger,
    format,
    transports,
    addColors
} = require('winston');
const {
    combine,
    timestamp,
    label,
    printf,
    colorize
} = format;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow'
    }
};

addColors(config.colors);

const logger = createLogger({
    level: 'info',
    format: combine(
        // label({ label: '' }),
        colorize(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
    ),
    transports: [
        new(transports.Console)(),
        new transports.File({
            name: 'info.log',
            filename: 'combined.log'
        })
    ]
});
module.exports = logger;