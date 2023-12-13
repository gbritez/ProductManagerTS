import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import { UsersService } from '../services/users.service'

export class UsersController {
    usersService: UsersService

    constructor() {
        this.usersService = new UsersService();
    }

    GetById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query
            const user = await this.usersService.Get(id)

            if (!user) {
                return res.status(404)
            }

            return res.status(200).json(user)
        }
        catch (error) {
            return res.status(500)
        }
    }

    Update = async (req: Request, res: Response) => {
        const { id, ...query } = req.query
        try {
            const user = await this.usersService.Update(id, { query }, { new: true })
            return res.status(200).json(user)
        }
        catch (error) {
            console.log(error)
            return res.status(500)
        }
    }
}