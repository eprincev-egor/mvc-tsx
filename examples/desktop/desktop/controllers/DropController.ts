import { Controller, forView, on, arg } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel } from "../item";

@forView(DesktopView)
export class DropController extends Controller<DesktopModel> {

    @on("drop", DesktopView.ui.desktop)
    @on("dragstart", DesktopView.ui.desktop)
    @on("dragend", DesktopView.ui.desktop)
    @on("dragover", DesktopView.ui.desktop)
    @on("dragenter", DesktopView.ui.desktop)
    @on("dragenter", DesktopView.ui.desktop)
    @on("dragleave", DesktopView.ui.desktop)
    onDragEvents(
        @arg("preventDefault") preventDefault: () => void
    ) {
        preventDefault();
    }
    
    @on("drop", DesktopView.ui.desktop)
    onDropFiles(
        @arg("dataTransfer", "files" as any) files: FileList,
        @arg("clientX") mouseX: number,
        @arg("clientY") mouseY: number
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
