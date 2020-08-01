import { Controller, forView, on, event } from "mvc-tsx";
import { GroupModel } from "../GroupModel";
import { GroupView } from "../GroupView";
import { UserView, UserModel } from "../../user";

@forView(GroupView)
export class SelectUserController extends Controller<GroupModel> {
    
    @on("click", UserView.ui.el)
    onClickUser(
        @event(UserModel) user: UserModel
    ) {
        const group = this.model;

        if ( user.selected ) {
            group.removeUser(user.id);
        }
        else {
            group.addUser(user.id);
        }
    }
}