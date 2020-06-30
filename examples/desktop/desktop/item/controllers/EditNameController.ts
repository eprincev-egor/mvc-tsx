import { Controller, forView, on, arg } from "mvc-tsx";
import { ItemModel } from "../ItemModel";
import { ItemView } from "../ItemView";

const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;

@forView(ItemView)
export class EditNameController extends Controller<ItemModel> {

    @on("dblclick", ItemView.ui.label)
    onStartEdit() {
        const item = this.model;
        item.enableEditing();
    }

    
    @on("keyup", ItemView.ui.nameInput)
    onKeyupEditInput(
        @arg("keyCode") keyCode: number,
        @arg("target", "value") inputValue: string
    ) {
        if ( keyCode === ENTER_KEY_CODE ) {
            this.onPressEnter(inputValue);
        }
        if ( keyCode === ESCAPE_KEY_CODE ) {
            this.onPressEscape();
        }
    }

    @on("blur", ItemView.ui.nameInput)
    onBlurEditInput() {
        const item = this.model;
        item.disableEditing();
    }

    private onPressEnter(inputValue: string) {
        const item = this.model;
        item.disableEditing();
        item.setName(inputValue);
    }

    private onPressEscape() {
        const item = this.model;
        item.disableEditing();
    }
}