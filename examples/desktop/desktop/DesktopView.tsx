import React from "react";
import ReactDOM from "react-dom";
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

    componentDidMount() {
        super.componentDidMount();

        const desktopEl = ReactDOM.findDOMNode(this) as Element;
        const desktopRect = desktopEl.getBoundingClientRect();

        const desktopModel = this.model;
        desktopModel.set({
            rect: {
                left: desktopRect.left,
                top: desktopRect.top,
                width: desktopRect.width,
                height: desktopRect.height
            }
        });
    }
}