import { populate } from "dotenv";
import { Model, Document, PaginateModel } from "mongoose";
export class BaseDao<T extends Document> {
    model: any
    constructor(model: Model<T>) {
        this.model = model
    }

    async GetOne(id, populate?) {
        if (populate) {
            return this.model.findById(id).populate(populate)
        }
        return this.model.findById(id).lean()
    }

    async GetAll() {
        return this.model.find()
    }

    async GetPaginated(query, limit = 20, page = 1, sort = 'asc') {
        return this.model.paginate(query, { limit, page, sort, lean: true })
    }

    async CreateOne(obj) {
        return this.model.create(obj)
    }

    async DeleteOne(id) {
        return this.model.findByIdAndDelete(id)
    }

    async UpdateOne(id, obj, options?) {
        return this.model.findByIdAndUpdate(id, obj, options)
    }
}