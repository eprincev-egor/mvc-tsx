import { Controller, forView, on, event } from "mvc-tsx";
import { GroupModel } from "../GroupModel";
import { GroupView } from "../GroupView";
import { UsersService } from "../../../../server/UsersService";

@forView(GroupView)
export class SearchUsersController extends Controller<GroupModel> {
    
    private usersService: UsersService;
    private timer: NodeJS.Timeout | undefined;
    
    constructor(group: GroupModel) {
        super(group);

        this.usersService = new UsersService();
        this.load();
    }

    async load() {
        const group = this.model;
        const searchPhrase = group.searchPhrase;
        const users = await this.usersService.findUsers(searchPhrase || undefined);

        group.setFilteredUsers( users );
    }

    @on("keyup", GroupView.ui.searchInput)
    onChangeSearchPhrase(
        @event("target", "value") searchPhrase: string
    ) {
        const group = this.model;
        group.setSearchPhrase(searchPhrase);

        if ( this.timer ) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.load();
        }, 2000);
    }
}