import { Model } from "mvc-tsx";
import { ItemModel } from "./item/ItemModel";

export class DesktopModel extends Model {
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