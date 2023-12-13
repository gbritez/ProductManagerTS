export class BaseDao {
    model: any
    constructor(model) {
        this.model = model
    }

    async GetAll() {
        return this.model.find()
    }

    async GetOne(id) {
        return this.model.findById(id).lean()
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
}