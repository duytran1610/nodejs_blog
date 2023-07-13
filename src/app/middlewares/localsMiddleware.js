module.exports = function SortMiddleware(req, res, next) {
    // The variables set on res.locals are available within a single request-response cycle, and will not be shared between requests.
    // respone local for sort
    res.locals._sort = {
        type: 'default'
    }

    // respone local for tell errol register, login
    res.locals.errol = {
        //name: '', account: '',password: '', confirm: '', login: ''
    }

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            column: req.query.column,
            type: req.query.type
        })
    }

    next();
}