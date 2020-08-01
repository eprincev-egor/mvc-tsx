import React from "react";
import { View } from "mvc-tsx";
import { UserModel } from "./UserModel";
import "./User.css";

export class UserView extends View<UserModel> {
    
    template(user: UserModel) {
        return <div className="ChatUser">
            <div className="ChatUser--avatar" style={this.getAvatarStyles(user)} data-color="red"></div>
            {this.getHighlightedName(user)}
            <div className="ChatUser--lastSeen">{this.getOnlineStatus(user)}</div>
        </div>
    }

    private getHighlightedName(user: UserModel) {
        if ( !user.highlightPhrase ) {
            return <div className="ChatUser--userName">
                {user.name}
            </div>;
        }

        const lowerName = user.name.toLowerCase();
        const lowerHighlightPhrase = user.highlightPhrase;
        const startHighlight = lowerName.indexOf(lowerHighlightPhrase);
        const endHighlight =  startHighlight + lowerHighlightPhrase.length;

        if ( startHighlight === -1 ) {
            return <div className="ChatUser--userName">
                {user.name}
            </div>;
        }

        const beforeText = user.name.slice(0, startHighlight);
        const highlightedText = user.name.slice(
            startHighlight,
            endHighlight
        );
        const afterText = user.name.slice(endHighlight);

        return <div className="ChatUser--userName">
            {beforeText}
            <span className="ChatUser--userNameHighlight">{ highlightedText }</span>
            {afterText}
        </div>;
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