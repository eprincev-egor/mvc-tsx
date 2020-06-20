import { Controller, on } from "mvc-tsx";
import { CartModel } from "./CartModel";

export class ClearCartController extends Controller<CartModel> {

    @on("click", ".Cart--clearBtn")
    onClickClear() {
        const cart = this.model;
        cart.clear();
    }
}