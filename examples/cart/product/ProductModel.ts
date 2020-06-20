import { Model } from "mvc-tsx";

export class ProductModel extends Model {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        super();
        
        this.name = name;
        this.price = price;
    }
}