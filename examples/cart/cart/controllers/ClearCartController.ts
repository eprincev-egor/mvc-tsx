import { Controller, on, forView } from "mvc-tsx";
import { CartModel } from "../CartModel";
import { CartView } from "../CartView";

@forView(CartView)
export class ClearCartController extends Controller<CartModel> {

    @on("click", CartView.ui.clear)
    onClickClear() {
        const cart = this.model;
        cart.clear();
    }
}