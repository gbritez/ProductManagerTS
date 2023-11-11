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
        passport.authenticate("github",
            {
                successRedirect: '/',
                failureRedirect: '/error',
                keepSessionInfo: true
            })(req, res, next)
    };
    // Register = async (req: Request, res: Response) => {
    //     const isAdmin = 'adminCoder@coder.com'
    //     const { firstName, lastName, age, email, password } = req.body;
    //     const user: IUser = {
    //         firstName,
    //         lastName,
    //         age,
    //         email,
    //         password: await hashData(password),
    //         role: email === isAdmin ? 'admin' : 'user'
    //     }
    //     try {
    //         const response = await this.loginDaoService.Register(user)
    //         if (!response) {
    //             res.status(500).send('Email already exists.')
    //         }
    //         else {
    //             req.session.user = { firstName: user.firstName, lastName: user.lastName }
    //             res.redirect('/')
    //         }
    //     }
    //     catch (error) {
    //         res.status(500).send(error)
    //     }
    // }
}