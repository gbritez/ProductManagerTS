import { UsersDao } from "../dao/mongo/users.dao";

export class UsersService {
    usersDao: UsersDao

    constructor() {
        this.usersDao = new UsersDao();
    }

    async Get(id) {
        return this.usersDao.GetOne(id)
    }

    async GetAll() {
        return this.usersDao.GetAll()
    }

    async Update(id, obj, options) {
        return this.usersDao.UpdateOne(id, obj, options)
    }

    async Delete(id) {
        return this.usersDao.DeleteOne(id)
    }
}