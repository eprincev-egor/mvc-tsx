import { Controller } from "./Controller";
import { View } from "./View";
import { DOMListener } from "./DOMListener";
import { getListeners, isDomListener, IListener } from "./ControllerMeta";

export class DOMEvents {
    
    addController(controller: Controller<any>, view: View<any>) {
        const listeners = getListeners(controller);

        for (const listener of listeners) {
            this.addListener(listener, view);
        }
    }

    private addListener(
        listener: IListener, 
        view: View<any>
    ) {
        if ( !isDomListener(listener) ) {
            return;
        }

        const domListener = new DOMListener({
            eventType: listener.eventType,
            selector: listener.selector,
            handlerArgs: listener.handlerArgs,
            handler: listener.handler,
            view
        });

        domListener.listen();
    }
}

