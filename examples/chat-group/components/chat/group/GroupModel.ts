import { Model } from "mvc-tsx";
import { IChatGroup, IImage, IUser } from "../../../server/interfaces";
import { UserModel } from "../user";

export class GroupModel
extends Model
implements IChatGroup {
    name: string = "";
    avatar?: IImage;
    usersIds: string[] = [];
    
    searchPhrase: string = "";
    filteredUsers: UserModel[] = [];

    getUser(userId: string): UserModel | undefined {
        const userModel = this.filteredUsers.find(user =>
            user.id === userId
        );
        return userModel;
    }

    setFilteredUsers(users: IUser[]) {
        const group: GroupModel = this;

        const usersModels = users.map(userRow => {
            const isSelected = group.usersIds.includes(userRow.id);
            const userModel = new UserModel(
                userRow, 
                isSelected, 
                group.searchPhrase
            );
            return userModel;
        });

        group.set({
            filteredUsers: usersModels
        });
    }

    setSearchPhrase(newSearchPhrase: string) {
        const group: GroupModel = this;

        group.set({searchPhrase: newSearchPhrase});
    }

    setAvatar(newAvatar: IImage) {
        const group: GroupModel = this;

        group.set({
            avatar: newAvatar
        });
    }
}