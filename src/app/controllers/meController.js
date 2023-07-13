//const Course = require('../models/course');
const {Course} = require('../models/index');  


class MeController {
    // [GET] /me/stored/courses
    StoredCourses(req, res, next) {
        if (req.session.user){
            let userID = req.session.user.userID;
            let condition1 = `"deletedAt" IS NULL and "userID" = ${userID}`;
            let condition2 = `"deletedAt" IS NOT NULL and "userID" = ${userID}`;
            Promise.all([Course.Sortable(req, condition1), Course.Count(condition2)])
                .then((result) =>                // result = [courses, countDeleted]
                    res.render('me/stored-courses', {
                        courses : result[0],
                        countDeleted: result[1][0].count
                    })
                )
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }

    // [GET] /me/trash/courses
    TrashCourses(req, res, next) {
        if (req.session.user){
            let userID = req.session.user.userID;
            let condition = `"deletedAt" IS NOT NULL and "userID" = ${userID}`;
            Course.Sortable(req, condition)
                .then((courses) => res.render('me/trash-courses', {courses}))
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }
}

module.exports = new MeController;