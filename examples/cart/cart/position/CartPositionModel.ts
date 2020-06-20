import { Model } from "mvc-tsx";
import { ProductModel } from "../../product/ProductModel";

export class CartPositionModel extends Model {
    product: ProductModel;
    quantity: number = 1;
    total: number;

    constructor(product: ProductModel) {
        super();

        this.product = product;
        this.total = product.price;
    }

    incrementQuantity() {
        const newQuantity = this.quantity + 1;
        this.setNewQuantity(newQuantity);
    }

    decrementQuantity() {
        const newQuantity = this.quantity - 1;
        this.setNewQuantity(newQuantity);
    }

    private setNewQuantity(newQuantity: number) {
        const position: CartPositionModel = this;
        
        position.set({
            quantity: newQuantity,
            total: position.product.price * newQuantity
        });
    }
}