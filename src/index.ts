import { IProduct, IProductList } from './interfaces';

export class ProductList implements IProductList {
    private productList: IProduct[] = [];
    private id: number = 1;

    createProduct(data: { name: string; price: number }): IProduct {
        const newProduct: IProduct = {
            id: this.id++,
            name: data.name,
            price: data.price,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.productList.push(newProduct);
        return newProduct;
    }

    getProducts(): IProduct[] {
        return this.productList;
    }

    getOneProduct(id: number): IProduct | undefined {
        return this.productList.find(product => product.id === id);
    }

    updateProduct(id: number, data: { name?: string; price?: number }): IProduct {
        const index = this.productList.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        const product = this.productList[index];
        const updatedProduct = {
            ...product,
            ...data,
            updatedAt: new Date(),
        };
        this.productList[index] = updatedProduct;
        return updatedProduct;
    }

    deleteProduct(id: number): { message: string } {
        const index = this.productList.findIndex(product => product.id === id);
        if (index !== -1) {
            this.productList.splice(index, 1);
        }
        return { message: "Product sucessfully deleted." }; 
    }
    
}

export const productList = new ProductList();

