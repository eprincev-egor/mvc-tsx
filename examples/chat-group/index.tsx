import * as React from "react";
import * as ReactDOM from "react-dom";
import { WindowModel, WindowView } from "./components/window";
import { GroupView } from "./components/chat/group";

const windowModel = new WindowModel("Создать групповой чат", 320, 600);

ReactDOM.render(
    <WindowView model={windowModel}>
        <GroupView/>
    </WindowView>,
    document.getElementById("root")
);
