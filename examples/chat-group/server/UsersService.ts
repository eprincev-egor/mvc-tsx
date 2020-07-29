import {
    sleepRandomTime,
    getRandomArrayElement,
    getRandomDateNearNow
} from "./utils";
import {IUser} from "./interfaces";
import {testUsers} from "./testUsers";

export class UsersService {

    private users: IUser[] = testUsers;

    async findUsers(searchPhrase?: string): Promise<IUser[]> {
        await sleepRandomTime();
        
        let users = this.users;

        if ( searchPhrase ) {
            const lowerSearchPhrase = searchPhrase.toLowerCase();

            users = users.filter(user => {
                const lowerUserName = user.name.toLowerCase();
                const containsSearchPhrase = lowerUserName.includes(lowerSearchPhrase);
                return containsSearchPhrase;
            });
        }

        users = users.map(user =>
            cloneUser(user)
        );

        return users;
    }
    
    async listenUserEvents(
        eventType: "login" | "logout", 
        handler: (userId: string, loginOrLogoutDate: Date) => void
    ) {
        while (true) {
            await sleepRandomTime();

            const randomDate = getRandomDateNearNow();
            const randomUser = getRandomArrayElement(this.users) as IUser;

            if ( eventType === "login" ) {
                const lastLogin = randomUser.lastLogin;
                const newLastLogin = calculateNewMaxDate(lastLogin, randomDate);
                randomUser.lastLogin = newLastLogin;
            }
            else {
                const lastLogout = randomUser.lastLogout;
                const newLastLogout = calculateNewMaxDate(lastLogout, randomDate);
                randomUser.lastLogout = newLastLogout;
            }

            handler(randomUser.id, randomDate);
        }
    }
}

function calculateNewMaxDate(lastDate: Date | undefined, newDate: Date) {
    if ( !lastDate ) {
        return newDate;
    }

    if ( lastDate > newDate ) {
        return lastDate;
    }

    return newDate;
}

function cloneUser(sourceUser: IUser): IUser {
    const userClone = {
        ...sourceUser
    };
    if ( sourceUser.avatar ) {
        userClone.avatar = {
            ...sourceUser.avatar
        };
    }

    return userClone;
}