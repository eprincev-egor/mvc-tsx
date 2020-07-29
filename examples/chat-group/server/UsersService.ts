import {
    sleepRandomTime,
    getRandomArrayElement,
    getRandomDateNearNow
} from "./utils";
import {IUser} from "./interfaces";
import {getTestUsers} from "./test-users";

export class UsersService {

    async findUsers(searchPhrase?: string): Promise<IUser[]> {
        await sleepRandomTime();
        
        let users = getTestUsers();
        if ( searchPhrase ) {
            const lowerSearchPhrase = searchPhrase.toLowerCase();

            users = users.filter(user => {
                const lowerUserName = user.name.toLowerCase();
                const containsSearchPhrase = lowerUserName.includes(lowerSearchPhrase);
                return containsSearchPhrase;
            });
        }

        return users;
    }
    
    async listenUserEvents(
        eventType: "login" | "logout", 
        handler: (userId: string, loginOrLogoutDate: Date) => void
    ) {
        const testUsers = getTestUsers();

        while (true) {
            await sleepRandomTime();

            const randomDate = getRandomDateNearNow();
            const randomUser = getRandomArrayElement(testUsers) as IUser;

            handler(randomUser.id, randomDate);
        }
    }
}

