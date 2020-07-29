import React from "react";
import { View } from "mvc-tsx";
import { UserModel } from "./UserModel";
import "./User.css";

export class UserView extends View<UserModel> {
    
    template(user: UserModel) {
        return <div className="ChatUser">
            <div className="ChatUser--avatar" style={this.getAvatarStyles(user)} data-color="red"></div>
            <div className="ChatUser--userName">{this.getHighlightedName(user)}</div>
            <div className="ChatUser--lastSeen">{this.getOnlineStatus(user)}</div>
        </div>
    }

    private getHighlightedName(user: UserModel) {
        return user.name;
    }

    private getAvatarStyles(user: UserModel) {
        if ( !user.avatar ) {
            return {};
        }

        return {
            backgroundImage: `url('${user.avatar.url}')`
        }
    }

    private getOnlineStatus(user: UserModel) {
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
}