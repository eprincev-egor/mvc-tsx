import { Controller, forView, on, event } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel } from "../item";

@forView(DesktopView)
export class DropController extends Controller<DesktopModel> {

    @on("drop", DesktopView)
    @on("dragstart", DesktopView)
    @on("dragend", DesktopView)
    @on("dragover", DesktopView)
    @on("dragenter", DesktopView)
    @on("dragenter", DesktopView)
    @on("dragleave", DesktopView)
    onDragEvents(
        @event("preventDefault") preventDefault: () => void
    ) {
        preventDefault();
    }
    
    @on("drop", DesktopView)
    onDropFiles(
        @event("dataTransfer", "files" as any) files: FileList,
        @event("clientX") mouseX: number,
        @event("clientY") mouseY: number
    ) {
        const desktop = this.model;

        const x = mouseX - desktop.rect.left;
        const y = mouseY - desktop.rect.top;

        const items: ItemModel[] = [];
        for (const file of files) {

            const item = new ItemModel({
                x,
                y,
                name: file.name
            });
            items.push(item);
        }

        desktop.add(items);
    }
}
