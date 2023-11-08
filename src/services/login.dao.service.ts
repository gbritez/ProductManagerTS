import User, { IUser, IUserCredentials } from "../models/user.model";
export class LoginDaoService {

    async Register(user: IUser) {
        try {
            const exists = await User.findOne({ email: user.email })
            if (exists) {
                throw new Error('User already exists')
            }
            else {
                const response = await User.create({ ...user })
                return response;
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async Login(credentials: IUserCredentials) {
        try {
            const user = await User.findOne({ email: credentials.email, password: credentials.password })
            if (user) {
                return user;
            }
            else {
                return false
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async Logout(req: any) {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }
}