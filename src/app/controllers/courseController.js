//const Course = require('../models/course');
const {Course} = require('../models/index');          
const {RecordToObj} = require('../ulti/convertToObj');
const { Op } = require("sequelize");

class CourseController {
    
    // [GET] /courses/create
    Create(req, res, next) {
        if (req.session.user){
            res.render('courses/create');
        }
        else{
            res.redirect('/user/loginForm');
        }          
    }

    // [POST] /courses/store
    Store(req, res, next) { 
        if (req.session.user){
            req.body.userID = req.session.user.userID; 
            req.body.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
            Course.create(req.body)
                .then(() => res.redirect('/me/stored/courses'))
                .catch(() => res.render('courses/createErrol'));
        }  
        else
            res.redirect('/user/loginForm');
    }

    // [GET] /courses/:id/edit
    Edit(req, res, next) {
        if (req.session.user){
            Course.findByPk(req.params.id)
            .then(course => res.render('courses/edit', {
                course: RecordToObj(course)
            }))
            .catch(next);
        }
        else{
            res.redirect('/user/loginForm');
        }             
    }

    // [PUT] /courses/:id
    Update(req, res, next) {
        if (req.session.user){
            Course.update(req.body,{where: {id: req.params.id}})
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next);
        }  
        else
            res.redirect('/user/loginForm');
    }

    // [POST] /courses
    Search(req, res, next) {
        if (req.session.user){
            let userID = req.session.user.userID;
            Course.findOne({where: {[Op.and]: [
                {userID: userID},
                {name: req.body.name}
            ]
            }})
                .then(course => {
                    res.render('courses/show', {
                        course : RecordToObj(course)
                    });
                })
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }

    // [GET] /courses/:slug
    Show(req, res, next) {
        if (req.session.user){
            Course.findOne({where: {slug: req.params.slug}})
                .then(course => {
                    res.render('courses/show', {
                        course : RecordToObj(course)
                    });
                })
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }

    // [DELETE] /courses/:id/force
    Destroy(req, res, next) {
        if (req.session.user){
            Course.destroy({where: {id: req.params.id}, force: true})
                .then(() => res.redirect('back'))
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }

    // [DELETE] /courses/:id    -  delete sort
    DeleteSort(req, res, next) {
        if (req.session.user){
            Course.destroy({where: {id: req.params.id}})
                .then(() => res.redirect('back'))
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }

    // [PATCH] /courses/:id/restore
    Restore(req, res, next) { 
        if (req.session.user){
            Course.restore({where: {id: req.params.id}})
                .then(() => res.redirect('back'))
                .catch(next);
        }
        else
            res.redirect('/user/loginForm');
    }

    // [POST] /courses/handle-form-actions
    HadleFormAction(req, res, next) {
        if (req.session.user){
            switch(req.body.action) {
                case 'delete':
                    Course.destroy({where: {id: {[Op.in]: req.body.courseIds}}})
                        .then(() => res.redirect('back'))
                        .catch(next);
                    break;
                case 'destroy':
                    Course.destroy({where: {id: {[Op.in]: req.body.courseIds}}, force: true})
                        .then(() => res.redirect('back'))
                        .catch(next);
                    break;
                case 'restore':
                    Course.restore({where: {id: {[Op.in]: req.body.courseIds}}})
                        .then(() => res.redirect('back'))
                        .catch(next);
                    break;
                default:
                    res.json({message: 'Action invalid'});
                    break;
            }
        }
        else
            res.redirect('/user/loginForm');
    }
}

module.exports = new CourseController;