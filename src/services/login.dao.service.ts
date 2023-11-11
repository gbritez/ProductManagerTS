import { compareData } from "../helpers/Encryption";
import User, { IUser, IUserCredentials } from "../models/user.model";
export class LoginDaoService {

    async Register(user: IUser) {
        try {
            const exists = await User.findOne({ email: user.email })
            if (exists) {
                return false;
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
            const user = await User.findOne({ email: credentials.email })
            if (user) {
                const isPasswordValid = await compareData(user.password, credentials.password)
                if (isPasswordValid) {
                    return user
                }
                else {
                    return false
                }
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