import React from "react";
import { View } from "mvc-tsx";
import { UserModel } from "./UserModel";
import { Highlight } from "./Highlight";
import "./User.css";

export class UserView extends View<UserModel> {
    
    template(user: UserModel) {
        return <div className="ChatUser">
            <div className="ChatUser--avatar" style={this.getAvatarStyles(user)} data-color="red"></div>

            <Highlight 
                className="ChatUser--userName"
                highlightClassName="ChatUser--userNameHighlight"
                text={user.name}
                highlightText={user.highlightPhrase}
            />

            <div className="ChatUser--lastSeen">{this.getOnlineStatus(user)}</div>
        </div>
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