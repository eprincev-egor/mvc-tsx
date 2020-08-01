import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { JSDOM } from "jsdom";
import { act } from "react-dom/test-utils";
import assert from "assert";
import { View, Model } from "../lib";

describe("View", () => {
    const dom = new JSDOM("<!DOCTYPE html><body></body>");
    global.document = dom.window.document;
    (global as any).window = dom.window;

    let container!: HTMLDivElement;

    beforeEach(() => {
        // подготавливаем DOM-элемент, куда будем рендерить
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        // подчищаем после завершения
        unmountComponentAtNode(container);
        container.remove();
        (container as any) = null;
    });

    it("simple view with text", () => {
        class MyModel extends Model {
            text: string;

            constructor(text: string) {
                super();
                this.text = text;
            }
        }

        class MyView extends View<MyModel> {
            template(model: MyModel) {
                return <div>{model.text}</div>
            }
        }

        const testModel = new MyModel("test");
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        assert.strictEqual(container.textContent, "test");
    });

    it("set new model on re-render and listen new model changes", () => {
        class UserModel extends Model {
            id: number;
            name: string;

            constructor(id: number, name: string) {
                super();
                this.id = id;
                this.name = name;
            }
        }
        class RootModel extends Model {
            users: UserModel[] = [];

            setUsers(newUsers: UserModel[]) {
                const root: RootModel = this;

                root.set({
                    users: newUsers
                });
            }
        }

        const usersViews: UserView[] = [];

        class UserView extends View<UserModel> {
            constructor(props: any) {
                super(props);
                usersViews.push(this);
            }

            template(user: UserModel) {
                return <div className={"user id-" + user.id}>{user.name}</div>
            }
        }

        class RootView extends View<RootModel> {
            template(root: RootModel) {
                return <div>{root.users.map(user =>
                    <UserView model={user} key={user.id}/>
                )}</div>
            }
        }

        const rootModel = new RootModel();
        rootModel.setUsers([
            new UserModel(1, "Bob"),
            new UserModel(2, "Oliver")
        ]);

        act(() => {
            render(<RootView model={rootModel}/>, container);
        });

        const oldUserModel1 = rootModel.users[0];
        const userView1 = usersViews[0];

        // check default name
        const user1El = document.querySelector(".user.id-1") as HTMLDivElement;
        assert.strictEqual(user1El.textContent, "Bob");

        assert.deepStrictEqual(userView1.state, {
            id: 1,
            name: "Bob"
        });

        rootModel.setUsers([
            new UserModel(1, "Jack"),
            new UserModel(2, "Oliver")
        ]);
        const newUserModel1 = rootModel.users[0];

        assert.deepStrictEqual(userView1.state, {
            id: 1,
            name: "Jack"
        });
        assert.strictEqual(user1El.textContent, "Jack");

        newUserModel1.set({name: "new name"});
        assert.strictEqual(user1El.textContent, "new name");

        oldUserModel1.set({
            name: "never"
        });

        assert.strictEqual(user1El.textContent, "new name");
        assert.deepStrictEqual(userView1.state, {
            id: 1,
            name: "new name"
        });
    });

});