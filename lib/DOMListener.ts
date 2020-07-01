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
    view: View<any>;
    private realEventType: keyof HTMLElementEventMap;
    private selector: string;
    private handlerArgs: ( string[] | (new (...args: any[]) => Model))[];
    private handler: (...args: any[]) => void;
    private domHandler!: (...args: any[]) => void;

    constructor(params: IDOMListenerParams) {
        this.realEventType = fixFocusAndBlur(params.eventType);
        this.selector = params.selector;
        this.handlerArgs = params.handlerArgs;
        this.handler = params.handler;
        this.view = params.view;

    }

    listen() {
        this.domHandler = (event: Event) => {
            this.onDOMEvent(event);
        };
        window.addEventListener(this.realEventType, this.domHandler);
    }

    destroy() {
        window.removeEventListener(this.realEventType, this.domHandler);
        delete this.view;
        delete this.handler;
        delete this.domHandler;
        delete this.handlerArgs;
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
        const args: any[] = this.handlerArgs.map((eventPropertyPath) => 
            this.getHandlerArgument(event, eventPropertyPath) 
        );

        return args;
    }

    private getHandlerArgument(
        event: Event, 
        eventPropertyPath: string[] | (new (...args: any[]) => Model)
    ) {
        if ( typeof eventPropertyPath === "function" ) {
            const ModelConstructor = eventPropertyPath;
            const model = this.getHandlerArgumentByModel(event, ModelConstructor);
            return model;
        }
        else {
            const argValue = getPropertyFromEvent(event, eventPropertyPath);
            return argValue;
        }
    }

    private getHandlerArgumentByModel(
        event: Event, 
        ModelConstructor: (new (...args: any[]) => Model)
    ) {
        const model = getNearestModelByEvent(event, ModelConstructor);
        if ( !model ) {
            throw new Error("cannot find model: " + ModelConstructor.name);
        }
        return model;
    }
}


// blur and focus do not bubbling
function fixFocusAndBlur(eventType: keyof HTMLElementEventMap): keyof HTMLElementEventMap {
    if ( eventType === "blur" ) {
        return "focusout";
    }

    if ( eventType === "focus" ) {
        return "focusin";
    }

    return eventType;
}