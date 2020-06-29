import { Controller, on, arg, forView } from "mvc-tsx";
import { TodoModel } from "../TodoModel";
import { TodoView } from "../TodoView";
import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from "../../keyCodes";

@forView(TodoView)
export class EditNameController extends Controller<TodoModel> {

    @on("dblclick", TodoView.ui.startEdit)
    onStartEdit(@arg("target") target: HTMLDivElement) {
        const todo = this.model;
        todo.enableEdit();
    }

    @on("keyup", TodoView.ui.nameInput)
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

    @on("blur", TodoView.ui.nameInput)
    onBlurEditInput() {
        const todo = this.model;
        todo.disableEdit();
    }

    private onPressEnter(inputValue: string) {
        const todo = this.model;
        todo.disableEdit();
        todo.setName(inputValue);
    }

    private onPressEscape() {
        const todo = this.model;
        todo.disableEdit();
    }
}