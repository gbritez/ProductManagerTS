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

        const isValid = await this.ValidateProduct(product)
        if (isValid) {
            products = [...products, product]
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log('Product added successfully.')
        }
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
        try {
            product = products.find(x => x.id === id);
            if (product) {
                return product;
            }
            else {
                console.log('Not found.')
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async UpdateProduct(product: Product) {
        const result: Product = await this.GetProductById(product.id);

        if (!result) {
            return;
        }

        let products = await this.GetProducts();
        products = products.filter(x => x.id !== product.id);
        products = [...products, product]
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        console.log('Updated product');

    }
    async DeleteProduct(id: number) {
        const product = await this.GetProductById(id);

        if (!product) {
            console.log('Not found.')
            return;
        }

        let products: Product[] = await this.GetProducts()
        products = products.filter(x => x.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log('Deleted product');
    }

    async ValidateProduct(product: Product) {
        const products = await this.GetProducts()
        if (Object.values(product).includes(null || '' || undefined)) {
            console.log('Product contains empty values.')
            return false;
        }
        if (products.some(x => x.code === product.code)) {
            console.log('Code duplicated.')
            return false;
        }
        return true;
    }
}