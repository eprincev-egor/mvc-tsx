import React from "react";
import { View } from "mvc-tsx";
import { UserModel } from "./UserModel";
import { Highlight } from "./Highlight";
import "./User.css";

export class UserView extends View<UserModel> {

    static ui = {
        el: ".ChatUser"
    };
    
    template(user: UserModel) {
        return <div className={this.getClassName(user)}>

            {this.printAvatar(user)}

            <Highlight 
                className="ChatUser--userName"
                highlightClassName="ChatUser--userNameHighlight"
                text={user.name}
                highlightText={user.highlightPhrase}
            />

            <div className="ChatUser--lastSeen">{user.getOnlineStatus()}</div>
        </div>
    }

    private getClassName(user: UserModel) {
        const classes = ["ChatUser"];

        if ( user.isOnline() ) {
            classes.push("ChatUser-online");
        }

        if ( user.selected ) {
            classes.push("ChatUser-selected");
        }
        
        const className = classes.join(" ");
        return className;
    }

    private printAvatar(user: UserModel) {
        if ( user.avatar ) {
            return <div className="ChatUser--avatar" 
                style={{
                    backgroundImage: `url('${user.avatar.url}')`
                }}></div>
        }
        else {
            return <div className="ChatUser--avatar ChatUser--avatar-default"
                data-color={user.getColor()}></div>
        }
    }
}