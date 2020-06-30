import { Model } from "mvc-tsx";

let uid = 0;

export class ItemModel extends Model {
    id: number = ++uid;
    x: number = 0;
    y: number = 0;
    name: string = "";
    selected: boolean = false;
    editing: boolean = false;

    constructor(params: {x: number, y: number, name: string}) {
        super();

        this.x = params.x;
        this.y = params.y;
        this.name = params.name;
    }

    setName(newName: string) {
        const item: ItemModel = this;
        item.set({ name: newName });
    }

    select() {
        const item: ItemModel = this;
        item.set({ selected: true });
    }

    enableEditing() {
        const item: ItemModel = this;
        item.set({ editing: true });
    }
    
    disableEditing() {
        const item: ItemModel = this;
        item.set({ editing: false });
    }

    setPosition(x: number, y: number) {
        const item: ItemModel = this;
        item.set({ x, y });
    }
}