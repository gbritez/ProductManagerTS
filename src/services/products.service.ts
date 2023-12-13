// import fs from 'fs';
// import { IProduct } from '../models/product.model';

// const dummyProduct: IProduct = {
//     id: 1,
//     title: 'dummy',
//     description: 'dummy',
//     price: 1,
//     code: 1,
//     stock: 1,
//     thumbnail: 'dummy'
// }

// function IsProduct(obj: any): obj is IProduct {
//     return (
//         'id' in obj &&
//         'title' in obj &&
//         'description' in obj &&
//         'price' in obj &&
//         'code' in obj &&
//         'stock' in obj &&
//         'thumbnail' in obj
//     );
//}
export class ProductsServiceObsolete {
    //     path: string;

    //     constructor() {
    //         this.path = 'src/productos.json'
    //         const fileExists = fs.existsSync(this.path)
    //         if (!fileExists) {
    //             fs.writeFileSync(this.path, '')
    //         }
    //     }

    //     async AddProduct(product: IProduct) {
    //         product.id = 1;
    //         let products: IProduct[] = await this.GetProducts();

    //         if (products.length > 0) {
    //             product.id = products[products.length - 1].id + 1;
    //         }

    //         await this.ValidateProduct(product)

    //         products = [...products, product]
    //         await fs.promises.writeFile(this.path, JSON.stringify(products))

    //     }

    //     async GetProducts() {
    //         let db = await fs.promises.readFile(this.path, 'utf-8');
    //         let products: IProduct[]
    //         if (db) {
    //             products = JSON.parse(db)
    //         }
    //         return products || [];
    //     }

    //     async GetProductById(id: number) {
    //         const products = await this.GetProducts();
    //         let product: IProduct;
    //         product = products.find(x => x.id === id);
    //         if (product) {
    //             return product;
    //         }
    //         else {
    //             throw new Error(`No product found for id: ${id}`)
    //         }
    //     }

    //     async UpdateProduct(product: IProduct) {
    //         await this.GetProductById(product.id);
    //         await this.ValidateProduct(product)

    //         let products = await this.GetProducts();
    //         products = products.filter(x => x.id !== product.id);
    //         products = [...products, product]
    //         await fs.promises.writeFile(this.path, JSON.stringify(products))
    //     }

    //     async DeleteProduct(id: number) {
    //         await this.GetProductById(id);

    //         let products: IProduct[] = await this.GetProducts()
    //         products = products.filter(x => x.id !== id);
    //         await fs.promises.writeFile(this.path, JSON.stringify(products));
    //     }

    //     async ValidateProduct(product: IProduct) {
    //         const invalidValues = [null, '', undefined]

    //         const products = await this.GetProducts()

    //         try {
    //             const invalidValuesResult = invalidValues.some(x => Object.values(product).includes(x))
    //             if (invalidValuesResult) {
    //                 throw new Error('Product contains empty values.')
    //             }
    //             if (!IsProduct(product) || Object.keys(product).length !== Object.keys(dummyProduct).length) {
    //                 throw new Error('Product has some missing or incorrect properties.')
    //             }
    //             products.forEach(item => {
    //                 if (item.code === product.code && item.id !== product.id) {
    //                     throw new Error('Code duplicated.')
    //                 }
    //             })
    //         }
    //         catch (error) {
    //             throw new Error(error.message)
    //         }
    //     }

}