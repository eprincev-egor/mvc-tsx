import * as ReactDOM from "react-dom";
import { View } from "./View";
import { Model } from "./Model";
import { isValidTarget } from "./utils/isValidTarget";
import { getPropertyFromEvent } from "./utils/getPropertyFromEvent";
import { getNearestModelByEvent } from "./utils/getNearestModelByEvent";

interface IDOMListenerParams {
    eventType: keyof HTMLElementEventMap;
    selector: string;
    handlerArgs: ( string[] | (new (...args: any[]) => Model))[];
    handler: (...args: any[]) => void,
    view: View<any>;
}

export class DOMListener {
    private eventType: keyof HTMLElementEventMap;
    private selector: string;
    private handlerArgs: ( string[] | (new (...args: any[]) => Model))[];
    private handler: (...args: any[]) => void;
    private view: View<any>;

    constructor(params: IDOMListenerParams) {
        this.eventType = params.eventType;
        this.selector = params.selector;
        this.handlerArgs = params.handlerArgs;
        this.handler = params.handler;
        this.view = params.view;
    }

    listen() {
        document.addEventListener(this.eventType, (event: Event) => {
            this.onDOMEvent(event);
        });
    }

    private onDOMEvent(event: Event) {
        if ( this.isValidEvent(event) ) {
            const args = this.getHandlerArgs(event);
            this.handler(...args);
        }
    }
    private isValidEvent(event: Event): boolean {
        const componentEl = ReactDOM.findDOMNode(this.view) as any;

        const thisIsValidTarget = isValidTarget({
            componentEl,
            selector: this.selector,
            target: event.target as any,
        });

        return thisIsValidTarget;
    }

    private getHandlerArgs(event: Event) {
        const args: any[] = this.handlerArgs.map((eventPropertyPath) => {
            if ( typeof eventPropertyPath === "function" ) {
                const ModelConstructor = eventPropertyPath;
                const model = getNearestModelByEvent(event, ModelConstructor);
                if ( !model ) {
                    throw new Error("cannot find model: " + ModelConstructor.name);
                }
                return model;
            }
            else {
                const argValue = getPropertyFromEvent(event, eventPropertyPath);
                return argValue;
            }
        });

        return args;
    }
}