import { Controller, on, forView, arg } from "mvc-tsx";
import { DesktopModel } from "../DesktopModel";
import { DesktopView } from "../DesktopView";
import { ItemModel } from "../item";

@forView(DesktopView)
export class SelectController extends Controller<DesktopModel> {
    
    @on("click", DesktopView.ui.item)
    onClickItem(
        @arg(ItemModel) item: ItemModel
    ) {
        item.select();
    }
}