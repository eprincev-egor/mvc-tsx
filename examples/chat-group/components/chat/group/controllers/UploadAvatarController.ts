import { Controller, forView, on, event } from "mvc-tsx";
import { GroupModel } from "../GroupModel";
import { GroupView } from "../GroupView";
import { FilesService } from "../../../../server/FilesService";

@forView(GroupView)
export class UploadAvatarController extends Controller<GroupModel> {
    
    private filesService =  new FilesService();

    @on("change", GroupView.ui.avatarInput)
    async onChangeAvatarFile(
        @event("target", "files", "0") file: File
    ) {
        const group = this.model;

        const uploadedURL = await this.filesService.uploadFile(file);
        const newAvatar = {
            url: uploadedURL
        };

        group.setAvatar(newAvatar);
    }
}