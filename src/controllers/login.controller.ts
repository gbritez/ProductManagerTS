import { Request, Response } from 'express'
import passport from "passport"

export class LoginController {
    constructor() {
    }

    Login = (req, res, next) => {
        passport.authenticate("login",
            {
                successRedirect: '/',
                failureRedirect: '/error',
                keepSessionInfo: true
            })(req, res, next)
    };

    Logout = async (req: Request, res: Response) => {
        try {
            req.session.destroy(() => {
                res.clearCookie('hideWelcomeMessage')
                res.redirect('/login')
            })
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    Register = (req, res, next) => {
        passport.authenticate("register", {
            successRedirect: '/',
            failureRedirect: '/error',
            keepSessionInfo: true
        })(req, res, next)
    };

    //GITHUB
    AuthorizeGithub = (req, res, next) => {
        passport.authenticate("github",
            {
                scope: ["user:email"],
                successRedirect: '/',
                failureRedirect: '/error',
                keepSessionInfo: true
            })(req, res, next)
    };
    LoginGithub = (req, res, next) => {
        passport.authenticate("github", {
            successRedirect: '/',
            failureRedirect: '/error',
            keepSessionInfo: true
        }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/error');
            }

            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }

                req.session.user = user;

                return res.redirect('/');
            });
        })(req, res, next);
    };

    Current = (req, res, next) => {
        try {
            if (req.session && req.session.user) {
                const currentUser = req.session.user;
                res.status(200).json(currentUser);
            } else {
                res.status(401).json({
                    message: 'User session not found',
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}