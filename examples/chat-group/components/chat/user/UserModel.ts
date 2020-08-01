import { Model } from "mvc-tsx";
import { IUser, IImage } from "../../../server/interfaces";

export class UserModel extends Model
implements IUser {
    id: string;
    name: string;
    avatar?: IImage;
    lastLogin?: Date;
    lastLogout?: Date;
    
    selected: boolean = false;
    highlightPhrase: string = "";
    
    constructor(
        userRow: IUser, 
        selected: boolean = false, 
        highlightPhrase: string = ""
    ) {
        super();
        
        this.id = userRow.id;
        this.name = userRow.name;
        this.avatar = userRow.avatar;
        this.lastLogin = userRow.lastLogin;
        this.lastLogout = userRow.lastLogout;
        
        this.selected = selected;
        this.highlightPhrase = highlightPhrase;
    }

    setLastLogin(loginDate: Date) {
        const user: UserModel = this;

        if ( user.lastLogin && user.lastLogin > loginDate ) {
            return;
        }

        user.set({
            lastLogin: loginDate
        });
    }

    setLastLogout(logoutDate: Date) {
        const user: UserModel = this;

        if ( user.lastLogout && user.lastLogout > logoutDate ) {
            return;
        }

        user.set({
            lastLogout: logoutDate
        });
    }
}