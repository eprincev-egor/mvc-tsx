import { Controller } from "./Controller";
import { View } from "./View";
import { DOMListener } from "./DOMListener";
import { getListeners, isDomListener, IListener } from "./ControllerMeta";

export class DOMEvents {
    private listeners: DOMListener[] = [];
    
    addController(controller: Controller<any>, view: View<any>) {
        const listeners = getListeners(controller);

        for (const listener of listeners) {
            this.addListener(listener, view);
        }
    }

    destroyListeners(view: View<any>) {
        const viewListeners = this.listeners.filter(listener =>
            listener.view === view
        );
        
        for (const listener of viewListeners) {
            listener.destroy();
            
            const listenerIndex = this.listeners.indexOf(listener);
            this.listeners.splice(listenerIndex, 1);
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
            eventType: listener.eventType as keyof HTMLElementEventMap,
            selector: listener.selector as string,
            handlerArgs: listener.handlerArgs,
            handler: listener.handler,
            view
        });

        domListener.listen();

        this.listeners.push(domListener);
    }
}

