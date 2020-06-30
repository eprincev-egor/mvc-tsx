import { Model } from "./Model";
import { getListeners, isModelListener, findHandlerArguments } from "./Meta";

export abstract class Controller<TModel extends Model> {
    protected model: Readonly<TModel>;
    private modelListeners: any[] = [];
    private dynamicListeners: any[] = [];

    constructor(model: TModel) {
        this.model = model;
        this.initModelEvents();
    }

    private initModelEvents() {
        const listeners = getListeners(this);
        const modelListeners = listeners.filter(listener =>
            isModelListener(listener)
        );

        for (const listener of modelListeners) {
            const eventType = listener.eventType as any;
            const handler = (...args: any[]) => {
                listener.handler(...args);
            };

            this.modelListeners.push({
                eventType,
                handler
            });
            this.model.on(eventType, handler);
        }
    }

    /**
     * Attach handler to View DOM events like are click, or model events.
     * @param eventType any DOM Event type
     * @param selector "model" or simple class selector like are: ".my-class". 
     * Selectors like are ".a .b .c" does not supported.
     */
    on(
        eventType: keyof HTMLElementEventMap,
        selector: string,
        handler: (...args: any[]) => void
    ) {
        const handlerArgs = findHandlerArguments(this, handler.name);
        handler = handler.bind(this);
        
        this.dynamicListeners.push({
            eventType,
            selector,
            handler,
            handlerArgs
        });
    }

    /**
     * Destroy controller and clear memory.
     * Detach all listeners.
     */
    destroy() {
        this.onDestroy();
        
        for (const modelListener of this.modelListeners) {
            this.model.removeListener(
                modelListener.eventType, 
                modelListener.handler
            );
        }

        delete this.model;
    }

    /**
     * Detach listeners and fix any memory leaks.
     * Should be any functions with clearing memory leaks.
     * This method will be called from before .destroy()
     */
    onDestroy() {
        // redefine me
    }

}