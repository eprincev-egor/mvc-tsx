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
    avatarImageLoading: boolean = true;
    
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

    getColor() {
        const user = this;

        const colors = [
            "red",
            "green",
            "blue",
            "orange"
        ];
        const colorIndex = +user.id % colors.length;
        const color = colors[ colorIndex ];

        return color;
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

    isOnline() {
        const user = this;

        const isOnline = user.lastLogin && (
            !user.lastLogout 
            ||
            user.lastLogout < user.lastLogin
        );

        return isOnline;
    }

    getOnlineStatus() {
        const user = this;

        if ( !user.lastLogin ) {
            return "Не заходил";
        }

        const isOnline = (
            !user.lastLogout 
            ||
            user.lastLogout < user.lastLogin
        );
        if ( isOnline ) {
            return "Онлайн"
        }

        if ( user.lastLogout ) {
            return `Заходил ${ user.lastLogout.toLocaleTimeString() }`;
        }

        return "";
    }

    setSelected(newSelectedState: boolean) {
        const user: UserModel = this;

        user.set({
            selected: newSelectedState
        });
    }

    turnoffAvatarImageLoading() {
        const user: UserModel = this;

        user.set({
            avatarImageLoading: false
        });
    }
}