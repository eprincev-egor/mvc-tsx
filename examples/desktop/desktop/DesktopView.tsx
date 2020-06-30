import React from "react";
import { View } from "mvc-tsx";
import { DesktopModel } from "./DesktopModel";
import { ItemView } from "./item/ItemView";
import "./Desktop.css";

export class DesktopView extends View<DesktopModel> {

    static ui = {
        desktop: ".Desktop",
        item: ".Item"
    };

    template(desktop: DesktopModel) {
        return (
            <div className="Desktop">
                {desktop.items.map(item =>
                    <ItemView model={item} key={item.id}/>
                )}
            </div>
        );
    }
}