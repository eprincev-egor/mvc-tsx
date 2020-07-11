import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { JSDOM } from "jsdom";
import { act } from "react-dom/test-utils";
import assert from "assert";
import { Controller, View, Model, on, event, forView } from "../lib";
import { DOMListener } from "../lib/DOMListener";

describe("Controller", () => {
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

    it("listen click on button", () => {
        class MyModel extends Model {
            counter: number = 0;
        }

        class MyView extends View<MyModel> {
            static ui = {
                button: ".button"
            }

            template(model: MyModel) {
                return <div>
                    <div className="counter">{model.counter}</div>
                    <button className="button"></button>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView.ui.button)
            onClickButton() {
                this.model.set({
                    counter: this.model.counter + 1
                });
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const buttonEl = document.querySelector(".button") as HTMLButtonElement;
        const counterEl = document.querySelector(".counter") as HTMLDivElement;

        const clickEvent = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent);

        assert.strictEqual(counterEl.textContent, "1");
    });

    it("listen model change", () => {
        class MyModel extends Model {
            a: number = 0;
            b: number = 0;
            c: number = 0;
        }

        class MyView extends View<MyModel> {

            template(model: MyModel) {
                return <div>
                    <div className="a">{model.a}</div>
                    <div className="b">{model.b}</div>
                    <div className="c">{model.c}</div>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on(MyModel, "change")
            onChangeModel(changes: MyModel) {
                this.model.set({
                    c: this.model.a + this.model.b
                });
            }
        
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const aEl = document.querySelector(".a") as HTMLDivElement;
        const bEl = document.querySelector(".b") as HTMLDivElement;
        const cEl = document.querySelector(".c") as HTMLDivElement;

        testModel.set({
            a: 1,
            b: 2
        });

        assert.strictEqual(aEl.textContent, "1");
        assert.strictEqual(bEl.textContent, "2");
        assert.strictEqual(cEl.textContent, "3");
    });

    it("listen model change without view", () => {
        class MyModel extends Model {
            a: number = 0;
            b: number = 0;
            c: number = 0;
        }

        class MyController extends Controller<MyModel> {
            @on(MyModel, "change")
            onChangeModel(changes: MyModel) {
                this.model.set({
                    c: this.model.a + this.model.b
                });
            }
        }

        const model = new MyModel();
        const controller = new MyController(model);

        model.set({
            a: 10,
            b: 15
        });

        assert.strictEqual(model.c, 25);
    });

    it("listen input change and get input value from event.target", () => {
        class MyModel extends Model {
            name: string | undefined;
        }

        class MyView extends View<MyModel> {
            static ui = {
                input: ".input"
            };

            template(model: MyModel) {
                return <div>
                    <div className="input" defaultValue=""/>
                    <div className="name">{model.name}</div>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("change", MyView.ui.input)
            onChangeInput(@event("target", "value") inputValue: string) {
                this.model.set({
                    name: inputValue
                });
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const inputEl = document.querySelector(".input") as HTMLInputElement;
        const nameEl = document.querySelector(".name") as HTMLDivElement;

        const changeEvent = new window.Event("change", {bubbles: true});
        inputEl.value = "hello";
        inputEl.dispatchEvent(changeEvent);

        assert.strictEqual(nameEl.textContent, "hello");
    });

    it("get child model from event", () => {
        class UserModel extends Model {
            id: number;
            name: string;

            constructor(id: number, name: string) {
                super();

                this.id = id;
                this.name = name;
            }
        }

        class UsersCollection extends Model {
            users: UserModel[];
            clicked: UserModel | undefined;

            constructor(users: UserModel[]) {
                super();
                this.users = users;
            }

            getClickedUser() {
                const clicked = this.clicked as UserModel;
                return {
                    id: clicked.id,
                    name: clicked.name
                };
            }
        }

        class UserView extends View<UserModel> {
            static ui = {
                user: ".User"
            };

            template(user: UserModel) {
                return <div className="User">#{user.id} {user.name}</div>;
            }
        }

        class UsersCollectionView extends View<UsersCollection> {

            template(collection: UsersCollection) {
                return <div>{collection.users.map(user =>
                    <UserView model={user}/>
                )}</div>;
            }
        }

        @forView(UsersCollectionView)
        class MyController extends Controller<UsersCollection> {

            @on("click", UserView.ui.user)
            onClickUser(@event(UserModel) user: UserModel) {
                this.model.set({
                    clicked: user
                });
            }
        
        }

        const bob = new UserModel(1, "Bob");
        const oliver = new UserModel(2, "Oliver");
        const usersCollection = new UsersCollection([
            bob,
            oliver
        ]);

        act(() => {
            render(<UsersCollectionView model={usersCollection}/>, container);
        });

        const usersEls = document.querySelectorAll(".User");
        const bobEl = usersEls[0] as HTMLDivElement;
        const oliverEl = usersEls[1] as HTMLDivElement;


        const bobClickEvent = new window.Event("click", {bubbles: true});
        bobEl.dispatchEvent(bobClickEvent);
        assert.deepStrictEqual(usersCollection.getClickedUser(), {
            id: 1,
            name: "Bob"
        });

        const oliverClickEvent = new window.Event("click", {bubbles: true});
        oliverEl.dispatchEvent(oliverClickEvent);
        assert.deepStrictEqual(usersCollection.getClickedUser(), {
            id: 2,
            name: "Oliver"
        });

    });

    it("using two args of event", () => {
        class MyModel extends Model {
            x: number = 0;
            y: number = 0;
        }

        class MyView extends View<MyModel> {
            static ui = {
                area: ".area"
            };

            template(model: MyModel) {
                return <div className="area">
                    <div className="x">{model.x}</div>
                    <div className="y">{model.y}</div>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("mousemove", MyView.ui.area)
            onChangeInput(
                @event("clientX") x: number,
                @event("clientY") y: number
            ) {
                this.model.set({
                    x,
                    y
                });
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const areaEl = document.querySelector(".area") as HTMLDivElement;
        const xEl = document.querySelector(".x") as HTMLDivElement;
        const yEl = document.querySelector(".y") as HTMLDivElement;

        const mouseMoveEvent = new window.Event("mousemove", {bubbles: true});
        (mouseMoveEvent as any).clientX = 100;
        (mouseMoveEvent as any).clientY = 100;
        areaEl.dispatchEvent(mouseMoveEvent);

        assert.strictEqual(xEl.textContent, "100");
        assert.strictEqual(yEl.textContent, "100");
    });

    it("using controller without events", () => {
        let controller!: MyController;

        class MyModel extends Model {
            value: number = 0;
        }

        class MyView extends View<MyModel> {
            template(model: MyModel) {
                return <div className="value">{model.value}</div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {
            constructor(model: MyModel) {
                super(model);
                
                controller = this;        
            }

            setValue(value: number) {
                this.model.set({
                    value: 30
                });
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        controller.setValue(30);

        const valueEl = document.querySelector(".value") as HTMLDivElement;

        assert.strictEqual(valueEl.textContent, "30");
    });

    it("listen two events", () => {
        class MyModel extends Model {
            clicks: number = 0;
        }

        class MyView extends View<MyModel> {
            static ui = {
                leftButton: ".left-button",
                rightButton: ".right-button"
            };

            template(model: MyModel) {
                return <div className="area">
                    <div className="clicks">{model.clicks}</div>
                    <button className="left-button"></button>
                    <button className="right-button"></button>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {
            @on("click", MyView.ui.leftButton)
            onClickLeftButton() {
                this.bumpClicks();
            }

            @on("click", MyView.ui.rightButton)
            onClickRightButton() {
                this.bumpClicks();
            }

            bumpClicks() {
                this.model.set({
                    clicks: this.model.clicks + 1
                });
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const clicksEl = document.querySelector(".clicks") as HTMLDivElement;
        const leftButtonEl = document.querySelector(".left-button") as HTMLDivElement;
        const rightButtonEl = document.querySelector(".right-button") as HTMLDivElement;

        const clickLeftEvent = new window.Event("click", {bubbles: true});
        leftButtonEl.dispatchEvent(clickLeftEvent);

        assert.strictEqual(clicksEl.textContent, "1");

        const clickRightEvent = new window.Event("click", {bubbles: true});
        rightButtonEl.dispatchEvent(clickRightEvent);

        assert.strictEqual(clicksEl.textContent, "2");
    });

    it("using @event() with long property path", () => {
        class MyModel extends Model {
            parentClassName: string = "";
        }

        class MyView extends View<MyModel> {
            static ui = {
                button: ".button"
            };

            template(model: MyModel) {
                return <div>
                    <div className="parentClassName">{model.parentClassName}</div>
                    <div className="left">
                        <div className="button"></div>
                    </div>
                    <div className="right">
                        <div className="button"></div>
                    </div>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView.ui.button)
            onClickButton(
                @event("target", "parentNode", "className") 
                parentClassName: string
            ) {
                this.model.set({
                    parentClassName
                });
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const parentClassEl = document.querySelector(".parentClassName") as HTMLDivElement;
        const leftButtonEl = document.querySelector(".left .button") as HTMLDivElement;
        const rightButtonEl = document.querySelector(".right .button") as HTMLDivElement;

        const leftClickEvent = new window.Event("click", {bubbles: true});
        leftButtonEl.dispatchEvent(leftClickEvent);

        assert.strictEqual(parentClassEl.textContent, "left");

        const rightClickEvent = new window.Event("click", {bubbles: true});
        rightButtonEl.dispatchEvent(rightClickEvent);

        assert.strictEqual(parentClassEl.textContent, "right");
    });


    it("cannot find model of event", () => {
        class MyModel extends Model {}
        class UnknownModel extends Model {}

        class MyView extends View<MyModel> {
            static ui = {
                some: ".some"
            };

            template(model: MyModel) {
                return <div className="some"></div>
            }
        }

        let hasCall = false;
        @forView(MyView)
        class MyController extends Controller<MyModel> {
            // istanbul ignore next
            @on("click", MyView.ui.some)
            onClickButton(@event(UnknownModel) model: UnknownModel) {
                hasCall = true;
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const someEl = document.querySelector(".some") as HTMLDivElement;

        let err: any = new Error("default error");
        window.onerror = (_err) => {
            err = _err;
        };

        const clickEvent = new window.Event("click", {bubbles: true});
        someEl.dispatchEvent(clickEvent);

        assert.strictEqual(hasCall, false);
    });

    it("stop listen dom events after destroy component", () => {
        let controllerCallsCount = 0;
        let domCallsCount = 0;

        const original = (DOMListener as any).prototype.onDOMEvent;
        (DOMListener as any).prototype.onDOMEvent = function(...args: any[]) {
            domCallsCount++;
            original.call(this, ...args);
        };

        class ChildModel extends Model {}
        class ParentModel extends Model {
            renderElement: boolean = true;
            child: ChildModel = new ChildModel();
        }

        class ChildView extends View<ChildModel> {
            static ui = {
                button: ".button"
            };

            template(model: ChildModel) {
                return <div>
                    <button className="button"></button>
                </div>
            }
        }

        @forView(ChildView)
        class ChildController extends Controller<ChildModel> {
            @on("click", ChildView.ui.button)
            onClickButton() {
                controllerCallsCount++;
            }
        }

        class ParentView extends View<ParentModel> {
            template(model: ParentModel) {
                if ( model.renderElement ) {
                    return <ChildView model={model.child}></ChildView>
                }
                else {
                    return <div></div>
                }
            }
        }

        const testModel = new ParentModel();
        act(() => {
            render(<ParentView model={testModel}/>, container);
        });

        const buttonEl = document.querySelector(".button") as HTMLButtonElement;

        const clickEvent1 = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent1);

        assert.strictEqual(controllerCallsCount, 1, "first controller call");
        assert.strictEqual(domCallsCount, 1, "first dom call");

        testModel.set({
            renderElement: false
        });

        const clickEvent2 = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent2);

        assert.strictEqual(controllerCallsCount, 1, "second controller call");
        assert.strictEqual(domCallsCount, 1, "second dom call");

        (DOMListener as any).prototype.onDOMEvent = original;
    });

    it("stop listen model events after destroy component", () => {
        let controllerCallsCount = 0;

        class ChildModel extends Model {
            value: number = 0;
        }

        class ParentModel extends Model {
            renderElement: boolean = true;
            child: ChildModel = new ChildModel();
        }
        
        class ChildView extends View<ChildModel> {
            template(model: ChildModel) {
                return <div></div>
            }
        }
        
        @forView(ChildView)
        class ChildController extends Controller<ChildModel> {
            @on(ChildModel, "change")
            onClickButton() {
                controllerCallsCount++;
            }

        }
        class ParentView extends View<ParentModel> {
            template(model: ParentModel) {
                if ( model.renderElement ) {
                    return <ChildView model={model.child}></ChildView>
                }
                else {
                    return <div></div>
                }
            }
        }

        const testModel = new ParentModel();
        act(() => {
            render(<ParentView model={testModel}/>, container);
        });

        testModel.child.set({
            value: 1
        });

        assert.strictEqual(controllerCallsCount, 1, "first model change");

        testModel.set({
            renderElement: false
        });

        testModel.child.set({
            value: 2
        });

        assert.strictEqual(controllerCallsCount, 1, "second model change");
    });


    it("selector should be simple className selector or model", () => {
        class MyModel extends Model {}

        assert.throws(() => {
            class MyController extends Controller<MyModel> {
                // istanbul ignore next
                @on("click", ".button some")
                onClickButton() {
                    // 
                }
            }
        }, err =>
            err.message === `invalid selector ".button some", selector should be just className like are ".some-class" or "window"`
        );


        assert.throws(() => {
            class MyController extends Controller<MyModel> {
                // istanbul ignore next
                @on("click", ".button>some")
                onClickButton() {
                    // 
                }
            }
        }, err =>
            err.message === `invalid selector ".button>some", selector should be just className like are ".some-class" or "window"`
        );

        assert.throws(() => {
            class MyController extends Controller<MyModel> {
                // istanbul ignore next
                @on("click", ".button,.x")
                onClickButton() {
                    // 
                }
            }
        }, err =>
            err.message === `invalid selector ".button,.x", selector should be just className like are ".some-class" or "window"`
        );
    });

    it("listen click on button with many classes", () => {
        class MyModel extends Model {
            counter: number = 0;
        }

        class MyView extends View<MyModel> {
            static ui = {
                button: ".button"
            };

            template(model: MyModel) {
                return <div>
                    <div className="counter">{model.counter}</div>
                    <button className="many button classes"></button>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView.ui.button)
            onClickButton() {
                this.model.set({
                    counter: this.model.counter + 1
                });
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const buttonEl = document.querySelector(".button") as HTMLButtonElement;
        const counterEl = document.querySelector(".counter") as HTMLDivElement;

        const clickEvent = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent);

        assert.strictEqual(counterEl.textContent, "1");
    });

    it("listen custom model event", () => {
        let callArgs: any[] = [];

        class MyModel extends Model {}

        class MyController extends Controller<MyModel> {
            @on(MyModel, "custom")
            onCustomEvent(...args: any[]) {
                callArgs = args;
            }
        }

        const model = new MyModel();
        const controller = new MyController(model);

        model.emit("custom", 1, 2);
        assert.deepStrictEqual(callArgs, [1, 2]);
    });

    it("error on model event while controllers instances are being created", () => {
        
        class MyModel extends Model {}
        class MyView extends View<MyModel> {

            // istanbul ignore next
            template(model: MyModel) {
                return <div></div>
            }
        }

        @forView(MyView)
        class FirstController extends Controller<MyModel> {
            constructor(model: MyModel) {
                super(model);

                model.emit("custom", "test");
            }
        }
        @forView(MyView)
        class SecondController extends Controller<MyModel> {}


        const testModel = new MyModel();

        assert.throws(() => {
            act(() => {
                render(<MyView model={testModel}/>, container);
            });
        }, err =>
            /FirstController: it is forbidden to emit any model event inside the controller constructor\. Triggered "custom"/
                .test(err.message)
        );
    });

    it("listen blur input", () => {
        let hasCall = false;

        class MyModel extends Model {}

        class MyView extends View<MyModel> {
            static ui = {
                input: ".input"
            };

            template(model: MyModel) {
                return <div>
                    <input className="input"/>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("blur", MyView.ui.input)
            onBlurInput() {
                hasCall = true;
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const inputEl = document.querySelector(".input") as HTMLInputElement;

        const blurEvent = new window.Event("focusout", {bubbles: true});
        inputEl.dispatchEvent(blurEvent);

        assert.strictEqual(hasCall, true);
    });


    it("listen focus input", () => {
        let hasCall = false;

        class MyModel extends Model {}

        class MyView extends View<MyModel> {
            static ui = {
                input: ".input"
            };

            template(model: MyModel) {
                return <div>
                    <input className="input"/>
                </div>
            }
        }

        @forView(MyView)
        class MyController extends Controller<MyModel> {
            @on("focus", MyView.ui.input)
            onFocusInput() {
                hasCall = true;
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const inputEl = document.querySelector(".input") as HTMLInputElement;

        const blurEvent = new window.Event("focusin", {bubbles: true});
        inputEl.dispatchEvent(blurEvent);

        assert.strictEqual(hasCall, true);
    });

    it("provide options to controller", () => {
        interface IOptions<TModel extends Model> {
            key: keyof TModel;
            selector: string;
        }
        interface IInput {
            value: string;
            classList: {
                add(className: string): void;
                remove(className: string): void;
            }
        }


        class FirstModel extends Model {
            name?: string;
        }
        class SecondModel extends Model {
            email?: string;
        }

        class FirstView extends View<FirstModel> {
            
            template(model: FirstModel) {
                return <div className="First">
                    <input className="nameInput"/>
                </div>;
            }
        }
        
        class SecondView extends View<SecondModel> {

            template() {
                return <div className="Second">
                    <input className="emailInput"/>
                </div>;
            }
        }

        @forView(FirstView, (first) =>
            new UniversalValidateController(first, {
                key: "name",
                selector: ".nameInput"
            })
        )
        @forView(SecondView, (second) => 
            new UniversalValidateController(second, {
                key: "email",
                selector: "emailInput"
            })
        )
        class UniversalValidateController<TModel extends Model> 
        extends Controller<TModel> {
            private options: IOptions<TModel>;

            constructor(model: TModel, options: IOptions<TModel>) {
                super(model);
                this.options = options;

                this.on("change", options.selector, this.onChangeInput);
            }

            onChangeInput(
                @event("target") input: IInput
            ) {
                const value = input.value;
                const isValid = value && value.trim();
                
                if ( isValid ) {
                    input.classList.remove("invalid");

                    this.model.set({
                        [this.options.key]: input.value.trim()
                    });
                }
                else {
                    input.classList.add("invalid");

                    this.model.set({
                        [this.options.key]: undefined
                    });
                }
            }
        }
        let inputEl: any;
        let changeEvent: any;

        // test FirstView and FirstModel
        const firstModel = new FirstModel();
        act(() => {
            render(<FirstView model={firstModel}/>, container);
        });

        inputEl = document.querySelector(".nameInput") as HTMLInputElement;

        changeEvent = new window.Event("change", {bubbles: true});
        inputEl.value = "hello";
        inputEl.dispatchEvent(changeEvent);

        assert.strictEqual(firstModel.name, "hello");


        // test SecondView and SecondModel
        const secondModel = new SecondModel();
        act(() => {
            render(<SecondView model={secondModel}/>, container);
        });

        inputEl = document.querySelector(".emailInput") as HTMLInputElement;

        changeEvent = new window.Event("change", {bubbles: true});
        inputEl.value = "   ";
        inputEl.dispatchEvent(changeEvent);

        assert.strictEqual(secondModel.email, undefined);

    });


    it("listen window events", () => {
        class MyModel extends Model {
            counter: number = 0;
        }

        class MyView extends View<MyModel> {
            template(model: MyModel) {
                return <div></div>
            }
        }

        let actualMouseX: number = 0;
        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("mousemove", "window")
            onMouseMove(@event("clientX") mouseX: number) {
                actualMouseX = mouseX;
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const mouseEvent = new window.Event("mousemove", {bubbles: true});
        (mouseEvent as any).clientX = 10;

        window.dispatchEvent(mouseEvent);
        assert.strictEqual(actualMouseX, 10);
    });

    it("get full event object", () => {
        class MyModel extends Model {}

        class MyView extends View<MyModel> {
            static ui = {
                button: ".button"
            }

            template(model: MyModel) {
                return <div>
                    <button className="button"></button>
                </div>
            }
        }

        let actualEvent: any = {};
        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView.ui.button)
            onClickButton(@event() e: any) {
                actualEvent = e;
            }
        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const buttonEl = document.querySelector(".button") as HTMLButtonElement;

        const clickEvent = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent);

        assert.strictEqual(actualEvent.type, "click");
        assert.strictEqual(actualEvent.target, buttonEl);
        assert.ok(actualEvent instanceof window.Event);
    });

    it("check event.currentTarget", () => {
        class MyModel extends Model {}

        class MyView extends View<MyModel> {
            static ui = {
                currentTarget: ".currentTarget"
            }

            template(model: MyModel) {
                return <div className="currentTarget">
                    <button className="button"></button>
                </div>
            }
        }

        let actualCurrentTargetClassName!: string;
        let actualTargetClassName!: string;
        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView.ui.currentTarget)
            onClickButton(
                @event("currentTarget", "className") currentTargetClassName: string,
                @event("target", "className") targetClassName: string
            ) {
                actualCurrentTargetClassName = currentTargetClassName;
                actualTargetClassName = targetClassName;
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const buttonEl = document.querySelector(".button") as HTMLButtonElement;

        const clickEvent = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent);

        assert.strictEqual(actualCurrentTargetClassName, "currentTarget");
        assert.strictEqual(actualTargetClassName, "button");
    });

    it("check event.currentTarget with many classes", () => {
        class MyModel extends Model {}

        class MyView extends View<MyModel> {
            static ui = {
                currentTarget: ".currentTarget"
            }

            template(model: MyModel) {
                return <div className="x currentTarget y">
                    <button className="button"></button>
                </div>
            }
        }

        let actualCurrentTargetClassName!: string;
        let actualTargetClassName!: string;
        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView.ui.currentTarget)
            onClickButton(
                @event("currentTarget", "className") currentTargetClassName: string,
                @event("target", "className") targetClassName: string
            ) {
                actualCurrentTargetClassName = currentTargetClassName;
                actualTargetClassName = targetClassName;
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const buttonEl = document.querySelector(".button") as HTMLButtonElement;

        const clickEvent = new window.Event("click", {bubbles: true});
        buttonEl.dispatchEvent(clickEvent);

        assert.strictEqual(actualCurrentTargetClassName, "x currentTarget y");
        assert.strictEqual(actualTargetClassName, "button");
    });

    it("@on('click', SomeView)", () => {
        class MyModel extends Model {}

        class MyView extends View<MyModel> {
            template(model: MyModel) {
                return <div className="some-view"></div>
            }
        }


        let actualTargetClassName!: string;

        @forView(MyView)
        class MyController extends Controller<MyModel> {

            @on("click", MyView)
            onClickMyView(
                @event("target", "className") targetClassName: string
            ) {
                actualTargetClassName = targetClassName;
            }

        }

        const testModel = new MyModel();
        act(() => {
            render(<MyView model={testModel}/>, container);
        });

        const viewEl = document.querySelector(".some-view") as HTMLButtonElement;

        const clickEvent = new window.Event("click", {bubbles: true});
        viewEl.dispatchEvent(clickEvent);

        assert.strictEqual(actualTargetClassName, "some-view");
    });

    it("@on arguments cannot be only functions", () => {
        class MyModel extends Model {}
        class MyView extends View<MyModel> {
            // istanbul ignore next
            template() {
                return <div></div>
            }
        }

        assert.throws(() => {
            class MyController extends Controller<MyModel> {
                // istanbul ignore next
                @on(MyModel, MyView)
                onClickButton() {
                    // 
                }
            }
        }, err =>
            err.message === `invalid call, first argument and second cannot be a function at the same time`
        );
    });


    it("@on('click', ChildView)", () => {
        class ChildModel extends Model {
            name: string;

            constructor(name: string) {
                super();
                this.name = name;
            }
        }

        class ParentModel extends Model {
            children: ChildModel[];
            
            constructor(children: ChildModel[]) {
                super();
                this.children = children;
            }
        }

        class ChildView extends View<ChildModel> {
            template(child: ChildModel) {
                return <div className="child">{child.name}</div>
            }
        }

        class ParentView extends View<ParentModel> {
            template(parent: ParentModel) {
                return <div className="parent">{
                    parent.children.map(child =>
                        <ChildView model={child}/>
                    )
                }</div>
            }
        }


        let actualChildName!: string;

        @forView(ParentView)
        class ParentController extends Controller<ParentModel> {

            @on("click", ChildView)
            onClickMyView(
                @event("target", "innerHTML") childName: string
            ) {
                actualChildName = childName;
            }
        }

        const bob = new ChildModel("bob");
        const oliver = new ChildModel("oliver");
        const parent = new ParentModel([
            bob, oliver
        ]);

        act(() => {
            render(<ParentView model={parent}/>, container);
        });

        const [bobEl, oliverEl] = document.querySelectorAll(".child");

        const clickEvent = new window.Event("click", {bubbles: true});
        
        bobEl.dispatchEvent(clickEvent);
        assert.strictEqual(actualChildName, "bob");

        oliverEl.dispatchEvent(clickEvent);
        assert.strictEqual(actualChildName, "oliver");
    });

});