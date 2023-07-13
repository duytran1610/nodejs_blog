//const Course = require('../models/course');
const {Course} = require('../models/index');  

class SiteController {
    // [GET] /
    Index(req, res, next) {
        if (req.session.user){
            let userID = req.session.user.userID;
            let condition = `"deletedAt" IS NULL and "userID" = ${userID}`;
            Course.Sortable(req, condition)
                .then(courses => {
                    res.render('home/home',{courses});
                })
                .catch(next);
        }
        else {
            res.render('home/news');
        }
    }

    // [GET] /search
    Search(req, res) {
        if (req.session.user)
            res.render('search');
        else
            res.redirect('/user/loginForm');
    }
}

module.exports = new SiteController;