import React from "react";
import { render, unmountComponentAtNode, findDOMNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { JSDOM } from "jsdom";
import assert from "assert";

import { Model } from "../lib/Model";
import { View } from "../lib/View";
import { DOMListener } from "../lib/DOMListener";

describe("DOMListener", () => {
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

    it("valid context for preventDefault", () => {
        let testView!: TestView;

        class TestModel extends Model {}
        class TestView extends View<TestModel> {
            constructor(props: any) {
                super(props);
                testView = this;
            }

            template() {
                return <div className="test"></div>
            }
        }

        const testModel = new TestModel();

        act(() => {
            render(<TestView model={testModel}/>, container);
        });

        const listener = new DOMListener({
            eventType: "click",
            selector: ".test",
            handlerArgs: [
                ["preventDefault"]
            ],
            handler: (argPreventDefault) => 
                argPreventDefault(),
            view: testView
        });


        let actualContext: any;
        const testEvent = {
            type: "click",
            target: findDOMNode(testView),
            preventDefault()  {
                actualContext = this;
            }
        };

        (listener as any).onDOMEvent(testEvent);

        assert.ok(actualContext === testEvent);
    });

});