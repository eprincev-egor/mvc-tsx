import { Controller, forView, on, event } from "mvc-tsx";
import { GroupModel } from "../GroupModel";
import { GroupView } from "../GroupView";
import { UsersService } from "../../../../server/UsersService";

const ENTER_KEY_CODE = 13;

@forView(GroupView)
export class SearchUsersController extends Controller<GroupModel> {
    
    private usersService: UsersService;
    private timer: NodeJS.Timeout | undefined;
    
    constructor(group: GroupModel) {
        super(group);

        this.usersService = new UsersService();
        this.load();
    }

    @on("keyup", GroupView.ui.searchInput)
    onKeyupInSearchInput(
        @event("target", "value") searchPhrase: string,
        @event("keyCode") keyCode: number
    ) {
        const group = this.model;
        group.setSearchPhrase(searchPhrase);

        if ( keyCode === ENTER_KEY_CODE ) {
            this.onPressEnter();
        }
        else {
            this.onChangeSearchPhrase();
        }
    }

    private onPressEnter() {
        this.clearTimeout();
        this.load();
    }

    private onChangeSearchPhrase() {
        this.clearTimeout();

        this.timer = setTimeout(() => {
            this.load();
        }, 2000);
    }

    private clearTimeout() {
        if ( this.timer ) {
            clearTimeout(this.timer);
        }
    }

    private async load() {
        const group = this.model;
        const searchPhrase = group.searchPhrase;
        const users = await this.usersService.findUsers(searchPhrase || undefined);

        group.setFilteredUsers( users );
    }
}