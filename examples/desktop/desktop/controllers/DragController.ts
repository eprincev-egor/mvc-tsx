import { Controller, on, forView, event } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel, ItemView } from "../item";

@forView(DesktopView)
export class DragController extends Controller<DesktopModel> {

    private target: ItemModel | undefined;
    private startItemPosition = {
        x: 0,
        y: 0
    };
    private startMousePosition = {
        x: 0,
        y: 0
    };


    @on("mousedown", ItemView)
    onDragStart(
        @event(ItemModel) item: ItemModel,
        @event("clientX") mouseX: number,
        @event("clientY") mouseY: number
    ) {
        this.target = item;

        this.startMousePosition = {
            x: mouseX,
            y: mouseY
        };
        this.startItemPosition = {
            x: item.x,
            y: item.y
        };
    }

    @on("mousemove", "window")
    onMove(
        @event("clientX") currentMouseX: number,
        @event("clientY") currentMouseY: number
    ) {
        if ( !this.target ) {
            return;
        }

        const desktop = this.model;
        const mouseDeltaX = currentMouseX - this.startMousePosition.x;
        const mouseDeltaY = currentMouseY - this.startMousePosition.y;

        let x = this.startItemPosition.x + mouseDeltaX;
        x = fixBounds(x, desktop.rect.width, this.target.width);

        let y = this.startItemPosition.y + mouseDeltaY;
        y = fixBounds(y, desktop.rect.height, this.target.height);
        
        this.target.setPosition(x, y);
    }

    @on("mouseup", "window")
    onDrop() {
        this.target = undefined;
    }
}

function fixBounds(
    coordinate: number, 
    desktopSize: number,
    itemSize: number
): number {
    coordinate = Math.max(0, coordinate);
    coordinate = Math.min(
        coordinate,
        desktopSize - itemSize
    );

    return coordinate;
}