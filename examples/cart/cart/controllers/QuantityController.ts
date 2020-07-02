import { Controller, on, event, forView } from "mvc-tsx";
import { CartModel } from "../CartModel";
import { CartPositionModel } from "../position/CartPositionModel";
import { CartPositionView } from "../position/CartPositionView";
import { CartView } from "..";

@forView(CartView)
export class QuantityController extends Controller<CartModel> {

    @on("click", CartPositionView.ui.incrementQuantity)
    onClickIncrement(
        @event(CartPositionModel) position: CartPositionModel
    ) {
        const cart = this.model;
        cart.incrementPositionQuantity(position);
    }

    @on("click", CartPositionView.ui.decrementQuantity)
    onClickDecrement(
        @event(CartPositionModel) position: CartPositionModel
    ) {
        const cart = this.model;
        cart.decrementPositionQuantity(position);
    }
}