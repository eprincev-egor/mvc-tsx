import { Controller, on, forView, event } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel } from "../item";

@forView(DesktopView)
export class SelectController extends Controller<DesktopModel> {
    
    @on("click", DesktopView.ui.item)
    onClickItem(
        @event(ItemModel) item: ItemModel
    ) {
        item.select();
    }
}