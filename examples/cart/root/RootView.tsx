import React from "react";
import { View } from "mvc-tsx";
import { RootModel } from "./RootModel";
import { ProductView } from "../product";
import { CartView } from "../cart";
import "./Root.css";

export class RootView extends View<RootModel> {

    template(root: RootModel) {
        return <div className="Root">

            <div className="Root--products">
                {root.products.map(product =>
                    <ProductView model={product} key={product.name}></ProductView>
                )}
            </div>

            <div className="Root--cart">
                <CartView model={root.cart}></CartView>
            </div>
            
        </div>
    }
}