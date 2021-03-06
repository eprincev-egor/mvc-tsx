import React from "react";
import { View } from "mvc-tsx";
import { CartModel } from "./CartModel";
import { CartPositionView } from "./position/CartPositionView";
import { formatPrice } from "../utils/formatPrice";
import "./Cart.css";

export class CartView extends View<CartModel> {

    static ui = {
        clear: ".Cart--clearBtn"
    };

    template(cart: CartModel) {
        return <div className="Cart">
            <div className="Cart--label">Cart:</div>

            <div className="Cart--positions">
                {cart.positions.map(position =>
                    <CartPositionView model={position} key={position.product.name}></CartPositionView>
                )}
            </div>

            <div className="Cart--total">
                Total: { formatPrice( cart.totalPrice ) } $
            </div>
            <button className="Cart--clearBtn">clear</button>
            
        </div>
    }
}