import { Controller, on, event, forView } from "mvc-tsx";
import { RootModel } from "../RootModel";
import { ProductModel } from "../../product";
import { ProductView } from "../../product";
import { RootView } from "../RootView";

@forView(RootView)
export class AddToCartController extends Controller<RootModel> {

    // we can listen click to sub views
    @on("click", ProductView.ui.addToCart)
    onClickAddToCart(
        // and get nearest Model from event
        @event(ProductModel) product: ProductModel
    ) {
        // call cart business logic
        this.model.cart.addProduct(product);
    }

}