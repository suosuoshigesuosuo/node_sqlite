const controllers = require('../controllers/controllers');

module.exports = (app) => {
    app.route('/student')
        .get(controllers.selectAll)
        .post(controllers.insert)


    app.route('/student/:id')
        .get(controllers.selectById)
        .post(controllers.updateById)
        .delete(controllers.deleteById)


    app.route('/mock')
        .get(controllers.mock)
}