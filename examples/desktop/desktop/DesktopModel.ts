import { Model } from "mvc-tsx";
import { ItemModel } from "./item/ItemModel";

export class DesktopModel extends Model {
    rect = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    };
    items: ItemModel[] = [];

    constructor(items: ItemModel[]) {
        super();
        
        this.items = items;
    }

    add(items: ItemModel[]) {
        const desktop: DesktopModel = this;
        const newItems = [...desktop.items, ...items];

        desktop.set({
            items: newItems
        });
    }
}