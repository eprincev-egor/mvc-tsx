import { Model } from "mvc-tsx";
import { ProductModel } from "../product/ProductModel";
import { CartModel } from "../cart/CartModel";

export class RootModel extends Model {
    products: ProductModel[];
    cart: CartModel = new CartModel();

    constructor(products: ProductModel[]) {
        super();
        this.products = products;
    }
}