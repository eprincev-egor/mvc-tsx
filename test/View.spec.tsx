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

});