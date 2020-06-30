import React from "react";
import { View } from "mvc-tsx";
import { CartPositionModel } from "./CartPositionModel";
import { formatPrice } from "../../utils/formatPrice";
import "./CartPosition.css";

export class CartPositionView extends View<CartPositionModel> {
    
    static ui = {
        incrementQuantity: ".CartPosition--incrementQuantityBtn",
        decrementQuantity: ".CartPosition--decrementQuantityBtn"
    };

    template(position: CartPositionModel) {
        return <div className="CartPosition">
            <div className="CartPosition--name">{position.product.name}</div>
            <div className="CartPosition--price">{ formatPrice(position.product.price) } $</div>
            <div className="CartPosition--quantity">* {position.quantity}</div>
            <div className="CartPosition--total">= { formatPrice(position.total) } $</div>
            <div className="CartPosition--incrementQuantity">
                <button className="CartPosition--incrementQuantityBtn">+</button>
            </div>
            <div className="CartPosition--decrementQuantity">
                <button className="CartPosition--decrementQuantityBtn">-</button>
            </div>
        </div>
    }
}