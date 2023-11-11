import { Request, Response } from 'express'
import { LoginDaoService } from '../services/login.dao.service'
import { IUser, IUserCredentials } from '../models/user.model'
import { hashData } from '../helpers/Encryption'
import passport from "passport"

export class LoginController {
    private loginDaoService: LoginDaoService
    constructor() {
        this.loginDaoService = new LoginDaoService()
    }

    Login = (req, res, next) => {
        passport.authenticate("login", {
            successRedirect: '/',
            failureRedirect: '/error',
            keepSessionInfo: true
        })(req, res, next);
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

    Register = async (req: Request, res: Response) => {
        const isAdmin = 'adminCoder@coder.com'
        const { firstName, lastName, age, email, password } = req.body;
        const user: IUser = {
            firstName,
            lastName,
            age,
            email,
            password: await hashData(password),
            role: email === isAdmin ? 'admin' : 'user'
        }
        try {
            const response = await this.loginDaoService.Register(user)
            if (!response) {
                res.status(500).send('Email already exists.')
            }
            else {
                req.session.user = { firstName: user.firstName, lastName: user.lastName }
                res.redirect('/')
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    }
}