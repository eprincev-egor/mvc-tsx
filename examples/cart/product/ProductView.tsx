import React from "react";
import { View } from "mvc-tsx";
import { ProductModel } from "./ProductModel";
import { formatPrice } from "../utils/formatPrice";
import "./Product.css";

export class ProductView extends View<ProductModel> {

    template(product: ProductModel) {
        return <div className="Product">
            <div className="Product--name">{product.name}</div>
            <div className="Product--price">{ formatPrice(product.price) } $</div>
            <div className="Product--toCart">
                <button className="Product--addToCartBtn">add to cart</button>
            </div>
        </div>
    }
}