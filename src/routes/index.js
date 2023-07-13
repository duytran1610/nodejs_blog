const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
const userRouter = require('./user');

function Route(app) {
    app.use('/user', userRouter);

    app.use('/me', meRouter);

    app.use('/courses', courseRouter);

    app.use('/', siteRouter);
}

module.exports = Route;