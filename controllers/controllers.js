const logger = require('../utils/logUtils'),
    config = require('../utils/configUtils'),
    sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('students.db');

// select all
exports.selectAll = (req, res, next) => {
    db.all(`SELECT * FROM STUDENT;`, [], function(err, rows) {
        let data = [];
        if (err) {
            logger.error(`select all error: ${err}`);
            next(err)
        }

        data = rows ? rows : [];

        res.json({
            success: 'true',
            data: data
        })
    })
}

// insert
exports.insert = (req, res, next) => {
    if (!req.body.name) {
        return res.json({
            success: 'false',
            message: 'params is error'
        })
    }
    db.serialize(function(){
        // insert data
        let promise = new Promise((resolve, reject) => {
            let sql = `INSERT INTO STUDENT (ID, NAME) VALUES (null, ${req.body.name});`;
            db.run(sql, function(err) {
                if (err) {
                    logger.error('Data has been inserted, query error')
                    next (err)
                }
                if(this.lastID){
                    resolve(this.lastID);
                }
            });
        });
        // select data
        promise.then(id => {
            db.get(`SELECT * FROM STUDENT WHERE ID = ${id};`, function(err, row){
                if(err){
                    logger.error('Data has been inserted, query error')
                    next(err)
                }
                res.json({
                    success: 'true',
                    data: row
                })
            })
        })
    })
}

// delete by id
exports.deleteById = (req, res, next) => {
    let id = req.params.id;
    if (id !== 0 && !id) {
        return res.json({
            success: 'false',
            message: 'params is error'
        })
    }
    db.serialize(function(){
        // select data
        let promise = new Promise((resolve, reject) => {
            db.get(`SELECT * FROM STUDENT WHERE ID = ${id};`, function(err, row){
                if(err){
                    logger.error('Data has been inserted, query error')
                    next(err)
                }
                if(row){
                    resolve(row)
                }
            })
        });
        // delete data
        promise.then(data => {
            let sql = `DELETE FROM STUDENT WHERE ID = ${id};`;
            db.exec(sql, function(err) {
                if (err) {
                    logger.error(`delete data by ID = ${id} error: ${err}`);
                    next(err)
                }
        
                res.json({
                    success: 'true',
                    data: data
                })
            });
        })
    })
}

// update by id
exports.updateById = (req, res, next) => {
    let id = req.params.id,
        name = req.body.name;

    if (id !== 0 && !id) {
        return res.json({
            success: 'false',
            message: `params 'id' is error`
        })
    }
    if(!name){
        return res.json({
            success: 'false',
            message: `params 'name' name cannot be empty`
        })
    }

    db.serialize(function(){
        // update data
        let promise = new Promise((resolve, reject) => {
            let sql = `UPDATE STUDENT SET NAME = ${name} WHERE ID = ${id};`;
            db.exec(sql, function(err) {
                if (err) {
                    next(err)
                }
                resolve(id)
            });
        });
        // select data
        promise.then(data => {
            db.get(`SELECT * FROM STUDENT WHERE ID = ${id};`, function(err, row){
                if(err){
                    logger.error('Data has been updated, query error')
                    next(err)
                }
                res.json({
                    success: 'true',
                    data: row
                })
            })
        })
    })
}

// select by id
exports.selectById = (req, res, next) => {
    let id = req.params.id;
    if (id !== 0 && !id) {
        return res.json({
            success: 'false',
            message: `No data with id equal to ${id}`
        })
    }
    db.get(`SELECT * FROM STUDENT WHERE ID = ${id};`, [], function(err, row) {
        if (err) {
            logger.error(`select by ID error: ${err}`);
            next(err)
        }

        return res.json({
            success: 'true',
            data: row
        })
    })
}

// mock data
exports.mock = (req, res, next) => {

    db.serialize(function(){
        // create table and mock data
        let promise = new Promise((resolve, reject) => {
            let createTableSql = `CREATE TABLE STUDENT (
                            ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE  NOT NULL,
                            NAME               TEXT              UNIQUE  NOT NULL
                        )`;
            db.run(createTableSql, function(err) {
                if (err) {
                    logger.error(`mock data is error: ${err}`)
                    next(err)
                }
                let insertSql = "";
                for (var i = 0; i < 50; i++) {
                    insertSql += `INSERT INTO STUDENT (ID, NAME) VALUES (null, ${i});`
                }

                db.exec(insertSql, function(err) {
                    if (err) {
                        next(err)
                    }
                    resolve()
                });
            });
        });
        // select data
        promise.then(data => {
            db.all(`SELECT * FROM STUDENT;`, [], function(err, rows) {
                let data = [];
                if (err) {
                    logger.error(`select all error: ${err}`);
                    next(err)
                }
        
                data = rows ? rows : [];
        
                res.json({
                    success: 'true',
                    data: data
                })
            })
        })
    }) 
}