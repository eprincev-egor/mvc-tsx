import { Controller, on } from "mvc-tsx";
import { UserModel } from "../UserModel";
import { UserView } from "..";

export class ImageLoadingController extends Controller<UserModel> {
    
    @on("load", UserView.ui.avatarImage)
    onLoadImage() {
        const user = this.model;
        user.turnoffAvatarImageLoading();
    }
}