import User, { IUser } from "../models/user.model";
import { BaseDao } from "./base.dao";

export class UsersDao extends BaseDao<IUser> {
    constructor() {
        super(User)
    }
}