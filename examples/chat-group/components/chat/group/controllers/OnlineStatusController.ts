import { Controller, forView } from "mvc-tsx";
import { GroupModel } from "../GroupModel";
import { GroupView } from "../GroupView";
import { UsersService } from "../../../../server/UsersService";

@forView(GroupView)
export class OnlineStatusController extends Controller<GroupModel> {
    
    private usersService: UsersService;
    
    constructor(group: GroupModel) {
        super(group);

        this.usersService = new UsersService();
        
        this.usersService.listenUserEvents("login", (userId, loginDate) => 
            this.onLoginUser(userId, loginDate)
        );
        this.usersService.listenUserEvents("logout", (userId, logoutDate) => 
            this.onLogoutUser(userId, logoutDate)
        );
    }

    onLoginUser(userId: string, loginDate: Date) {
        const group = this.model;
        const user = group.getUser(userId)
        if ( !user ) {
            return;
        }

        user.setLastLogin(loginDate);
    }

    onLogoutUser(userId: string, logoutDate: Date) {
        const group = this.model;
        const user = group.getUser(userId)
        if ( !user ) {
            return;
        }

        user.setLastLogout(logoutDate);
    }
}