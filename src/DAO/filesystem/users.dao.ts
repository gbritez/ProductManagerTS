import { BaseDao } from "./base.dao";

export class UsersDao extends BaseDao {
    constructor() {
        super(process.env.USERS_LOCAL_PATH)
    }
}