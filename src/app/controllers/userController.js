//const User = require('../models/user');
const {User} = require('../models/index');
const {RecordToObj} = require('../ulti/convertToObj');
const { Op } = require("sequelize");
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


class UserController {
    // [GET] /user/signupForm
    SignupForm(req, res, next){
        res.render('user/signupForm');
    }

    // [POST] /user/signupForm/register
    async Signup(req, res, next){
        if (User.TellError(req, res)) {
            res.status(400).render('user/signupForm', {userErrol: req.body});
        }
        else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.encodeID = 'user';
            User.create(req.body)
                .then((user) => {
                    // regenerate the session, which is good practice to help
                    // guard against forms of session fixation
                    req.session.regenerate(function (err) {
                        if (err) next(err)

                        // store user information in session, typically a user id
                        req.session.user = {
                            userID: user.userID,
                            name: user.user_name
                        };

                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                            if (err) return next(err);
                            res.redirect('/');
                        })
                    })
                })
                .catch(() => {
                    res.locals.errol.account = 'Account already exists!';
                    res.status(500).render('user/signupForm', {userErrol: req.body});
                });
        }
    }

    // [GET] /user/loginForm
    LoginForm(req, res, next){
        res.render('user/loginForm');
    }

    // [POST] /user/loginForm/login
    async Login(req, res, next){        
        try {
            const user = await User.findOne({where: {account: req.body.account}});
            const pwd = req.body.password;
            const match = await bcrypt.compare(pwd, user.password);

            if (!match) throw new Error();

            req.session.regenerate(function (err) {
                if (err) next(err);

                // store user information in session, typically a user id
                req.session.user = {
                    userID: user.userID,
                    name: user.user_name
                };

                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return next(err);
                    res.redirect('/');
                })
            })
        }
        catch(err){
            res.locals.errol.login= 'Account or password is not right!';
            res.status(401).render('user/loginForm');
        }
    }    

    // [GET] /user/logout
    Logout(req, res, next){
        // clear the user from the session object and save.
        // this will ensure that re-using the old session id
        // does not have a logged in user
        req.session.user = null;
        req.session.save(function (err) {
            if (err) next(err);

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err);
                res.redirect('/');
            })
        })
    }
}

module.exports = new UserController;