import React from "react";
import { View } from "mvc-tsx";
import { GroupModel } from "./GroupModel";
import { UserView } from "../user";
import "./Group.css";

export class GroupView extends View<GroupModel> {
    
    static defaultProps = {
        model: new GroupModel()
    };

    static ui = {
        avatarInput: ".ChatGroup--avatarInput",
        searchInput: ".ChatGroup--searchUsersInput",
        clearSelected: ".ChatGroup--clearSelectedButton"
    };
    
    template(group: GroupModel) {
        return <div className="ChatGroup">

            <div className="ChatGroup--head">
                {this.printAvatar(group)}
                
                <div className="ChatGroup--form">
                    <input className="ChatGroup--groupNameInput" placeholder="Наименование группы" autoFocus/>

                    <div className="ChatGroup--searchUsers">
                        <input className="ChatGroup--searchUsersInput" placeholder="Поиск"/>
                    </div>
                </div>
            </div>

            <div className={"ChatGroup--users " + (
                group.filteredUsers.length === 0 ?
                    "ChatGroup--users-empty" : ""
            )}>
                <div className="ChatGroup--usersEmptyBox">
                <div className="ChatGroup--usersEmptyText">Нет пользователей</div>
                </div>

                {group.filteredUsers.map(user =>
                    <UserView model={user} key={user.id}></UserView>
                )}
            </div>

            <div className="ChatGroup--bottom">
                <div className="ChatGroup--selectedUsersCount">{this.getSelectedUsersCountText(group)}</div>
                <div className="ChatGroup--clearSelectedButton">Очистить</div>
            </div>
        </div>
    }

    getSelectedUsersCountText(group: GroupModel) {
        const membersCount = group.usersIds.length;

        if ( !membersCount ) {
            return "";
        }

        let membersPhrase: string = "участников";
        if (
            /^[^1]?1$/.test(membersCount.toString())
        ) {
            membersPhrase = "участник";
        } else if (
            /^[^1]?[234]$/.test(membersCount.toString())
        ) {
            membersPhrase = "участника";
        }

        const output = `${membersCount} ${membersPhrase}`;
        return output;
    }

    private printAvatar(group: GroupModel) {
        if ( group.avatar ) {
            return <div className="ChatGroup--avatar" style={{
                backgroundImage: `url('${group.avatar.url}')`
            }}>
                <input accept="image/*" type="file" className="ChatGroup--avatarInput"/>
            </div>
        }
        else {
            return <div className="ChatGroup--avatar fas fa-image">
                <input accept="image/*" type="file" className="ChatGroup--avatarInput"/>
            </div>
        }
    }
}