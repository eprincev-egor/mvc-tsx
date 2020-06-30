import { Controller, forView, on, arg } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel } from "../item";
import { IElement } from "./IElement";

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
        @arg("target") desktopEl: IElement,
        
        @arg("dataTransfer", "files" as any) files: FileList,
        @arg("clientX") clientX: number,
        @arg("clientY") clientY: number
    ) {
        const rect = desktopEl.getBoundingClientRect();

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const items: ItemModel[] = [];
        for (const file of files) {

            const item = new ItemModel({
                x,
                y,
                name: file.name
            });
            items.push(item);
        }

        const desktop = this.model;
        desktop.add(items);
    }
}
