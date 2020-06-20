import { Controller, on, arg } from "mvc-tsx";
import { CartModel } from "./CartModel";
import { CartPositionModel } from "./position/CartPositionModel";

export class QuantityController extends Controller<CartModel> {

    @on("click", ".CartPosition--incrementQuantityBtn")
    onClickIncrement(@arg(CartPositionModel) position: CartPositionModel) {
        const cart = this.model;
        cart.incrementPositionQuantity(position);
    }

    @on("click", ".CartPosition--decrementQuantityBtn")
    onClickDecrement(@arg(CartPositionModel) position: CartPositionModel) {
        const cart = this.model;
        cart.decrementPositionQuantity(position);
    }
}