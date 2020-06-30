import { Controller, on, forView, arg } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel } from "../item";
import { IElement } from "./IElement";

@forView(DesktopView)
export class DragController extends Controller<DesktopModel> {

    private target: ItemModel | undefined;
    private desktopPosition = {
        left: 0,
        top: 0
    };
    private itemOffset = {
        x: 0,
        y: 0
    };


    @on("mousedown", DesktopView.ui.item)
    onDragStart(
        @arg(ItemModel) item: ItemModel,
        @arg("target") target: IElement,
        @arg("clientX") mouseX: number,
        @arg("clientY") mouseY: number
    ) {
        const rect = target.getBoundingClientRect();

        this.target = item;
        this.desktopPosition = {
            left: rect.left,
            top: rect.top
        };
        this.itemOffset = {
            x: mouseX - rect.left - item.x,
            y: mouseY - rect.top - item.y
        };
    }

    @on("mousemove", DesktopView.ui.desktop)
    onMove(
        @arg("clientX") mouseX: number,
        @arg("clientY") mouseY: number
    ) {
        if ( !this.target ) {
            return;
        }

        const x = mouseX - this.desktopPosition.left - this.itemOffset.x;
        const y = mouseY - this.desktopPosition.top - this.itemOffset.y;
        
        this.target.setPosition(x, y);
    }

    @on("mouseup", DesktopView.ui.desktop)
    onDrop() {
        this.target = undefined;
    }
}