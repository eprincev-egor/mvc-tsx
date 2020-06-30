import React from "react";
import ReactDOM from "react-dom";
import { View } from "mvc-tsx";
import { ItemModel } from "./ItemModel";
import "./Item.css";

export class ItemView extends View<ItemModel> {
    
    static ui = {
        label: ".Item--label",
        nameInput: ".Item--nameInput"
    };
    
    template(item: ItemModel) {
        return (
            <div className={this.className()} style={{
                left: item.x + "px",
                top: item.y + "px"
            }}>
                <div className="Item--label">{item.name}</div>
                {item.editing ? this.inputTemplate() : undefined}
            </div>
        );
    }

    componentDidUpdate() {
        const item = this.model;
        if ( item.editing ) {
            const inputEl = ReactDOM.findDOMNode(this.refs.EditNameInput) as HTMLInputElement | null;

            if ( inputEl ) {
                inputEl.focus();
            }
        }
    }

    className() {
        const item = this.model;
        const classes = ["Item"];

        if ( item.selected ) {
            classes.push("Item-selected");
        }

        if ( item.editing ) {
            classes.push("Item-editing");
        }

        return classes.join(" ");
    }

    inputTemplate() {
        const item = this.model;
        return <input 
            className="Item--nameInput"
            defaultValue={item.name}
            ref="EditNameInput"
        />
    }
}