import User from "../models/user.model";
import { BaseDao } from "./base.dao";

export class UsersDao extends BaseDao {
    constructor() {
        super(User)
    }
}