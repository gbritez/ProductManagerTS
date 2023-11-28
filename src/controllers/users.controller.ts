import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'

export class UsersController {
    constructor() { }

    GetById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query
            const user = await User.findById(id)

            if (!user) {
                return res.status(404)
            }

            return res.status(200).json(user)
        }
        catch (error) {

        }
    }
    Update = async (req: Request, res: Response) => {
        const { id, ...query } = req.query
        try {
            const user = await User.findByIdAndUpdate(id, { query }, { new: true })
        }
        catch (error) {
            console.log(error)
        }
    }
}