import { Controller, on, arg } from "mvc-tsx";
import { RootModel } from "./RootModel";
import { ProductModel } from "../product/ProductModel";

export class AddToCartController extends Controller<RootModel> {

    // we can listen click to sub views
    @on("click", ".Product--addToCartBtn")
    onClickAddToCart(
        // and get nearest Model from event
        @arg(ProductModel) product: ProductModel
    ) {
        // call cart business logic
        this.model.cart.addProduct(product);
    }

}