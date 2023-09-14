import fs from 'fs';

export interface Product {
    id?: number,
    title: string,
    description: string,
    price: number,
    code: number,
    stock: number,
    thumbnail: string
}

export class ProductManager {
    path: string;

    constructor(path: string) {
        this.path = path

        const fileExists = fs.existsSync(path)
        if (!fileExists) {
            fs.writeFileSync(this.path, '')
        }
    }

    async AddProduct(product: Product) {
        let products: Product[] = await this.GetProducts();
        if (products.length > 0) {
            product.id = products[products.length - 1].id + 1;
        }
        else {
            product.id = 1;
        }

        await this.ValidateProduct(product)

        products = [...products, product]
        await fs.promises.writeFile(this.path, JSON.stringify(products))

    }
    async GetProducts() {
        let db = await fs.promises.readFile(this.path, 'utf-8');
        let products: Product[]

        if (db) {
            products = JSON.parse(db)
        }
        return products || [];
    }
    async GetProductById(id: number) {
        const products = await this.GetProducts();
        let product: Product;
        product = products.find(x => x.id === id);
        if (product) {
            return product;
        }
        else {
            throw new Error(`No product found for id: ${id}`)
        }
    }
    async UpdateProduct(product: Product) {
        await this.GetProductById(product.id);
        await this.ValidateProduct(product)

        let products = await this.GetProducts();
        products = products.filter(x => x.id !== product.id);
        products = [...products, product]
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        console.log('Updated product');

    }
    async DeleteProduct(id: number) {
        await this.GetProductById(id);

        let products: Product[] = await this.GetProducts()
        products = products.filter(x => x.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    async ValidateProduct(product: Product) {
        const invalidValues = [null, '', undefined]

        const products = await this.GetProducts()

        try {
            const invalidValuesResult = invalidValues.some(x => Object.values(product).includes(x))
            if (invalidValuesResult) {
                throw new Error('Product contains empty values.')
            }
            if (products.some(x => x.code === product.code)) {
                throw new Error('Code duplicated.')
            }
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
}