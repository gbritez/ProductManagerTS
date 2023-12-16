import fs from 'fs'

export class BaseDao {
    path: string;

    constructor(path) {
        this.path = path
        const fileExists = fs.existsSync(this.path)
        if (!fileExists) {
            fs.writeFileSync(this.path, '')
        }
    }

    async GetAll() {
        let db = await fs.promises.readFile(this.path, 'utf-8');
        let data
        if (db) {
            data = JSON.parse(db)
        }
        return data || [];
    }

    async GetOne(id) {
        const data = await this.GetAll();
        const item = data.find(x => x.id === id);
        if (item) {
            return item;
        }
        else {
            throw new Error(`No item found for id: ${id}`)
        }
    }

    async DeleteOne(id) {
        const item = await this.GetOne(id);

        if (item) {
            let data = await this.GetAll()
            data = data.filter(x => x.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(data));
        }
    }

    async UpdateOne(obj) {
        const item = await this.GetOne(obj.id)

        if (item) {
            let data = await this.GetAll()
            data = data.filter(x => x.id !== item.id)
            data = [...data, obj]
            await fs.promises.writeFile(this.path, JSON.stringify(data))
        }
    }
}