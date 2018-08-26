const express = require('express'),
    bodyParser = require('body-parser'),
    sqlite3 = require('sqlite3'),
    logger = require('./utils/logUtils'),
    config = require('./utils/configUtils'),
    routes = require('./routes/routes'),
    app = express();

const port = config.get('PORT') || 3000;
const tableName = config.get('tableName') || 'student';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app)

// error Router
app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = '404';
    next(err);
});

app.post('*', function(req, res, next) {
    var err = new Error();
    err.status = '404';
    next(err);
});

app.delete('*', function(req, res, next) {
    var err = new Error();
    err.status = '404';
    next(err);
});

app.put('*', function(req, res, next) {
    var err = new Error();
    err.status = '404';
    next(err);
});

app.use(function(err, req, res, next) {
    if (err.status !== '404') {
        return res.json({
            success: 'false',
            message: err.message
        });
    } else {
        res.status('404').redirect('http://www.404.com');
    }
})


app.listen(port)

logger.info('server start on the port: ' + port)