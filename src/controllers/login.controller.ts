import { Request, Response } from 'express'
import { LoginDaoService } from '../services/login.dao.service'
import { IUser, IUserCredentials } from '../models/user.model'

export class LoginController {
    private loginDaoService: LoginDaoService
    constructor() {
        this.loginDaoService = new LoginDaoService()
    }


    Login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const credentials: IUserCredentials = {
            email,
            password
        }
        try {
            const response = await this.loginDaoService.Login(credentials)
            if (response) {
                req.session.user = { firstName: response.firstName, lastName: response.lastName }
                res.redirect('/')
            }
            else {
                res.status(401).send('User or password incorrect')
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

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
            password,
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