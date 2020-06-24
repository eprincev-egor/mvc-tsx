import { Controller } from "mvc-tsx";
import { AppModel } from "../AppModel";

export class RouterController extends Controller<AppModel> {
    constructor(app: AppModel) {
        super(app);

        this.onChangeHash = this.onChangeHash.bind(this);

        window.addEventListener("load", this.onChangeHash);
        window.addEventListener("hashchange", this.onChangeHash);
    }

    onChangeHash() {
        const app = this.model;
        const statusFilter = getStatusFilterFromLocationHash();

        app.setStatusFilter(statusFilter);
    }
}

function getStatusFilterFromLocationHash() {
    const hash = location.hash;
    
    if ( hash === "#/completed" ) {
        return "completed";
    }

    if ( hash === "#/active" ) {
        return "active";
    }

    return "all";
}