import { Model } from "./Model";
import { getListeners, isModelListener } from "./ControllerMeta";

export abstract class Controller<TModel extends Model> {
    protected model: Readonly<TModel>;
    private modelListeners: any[] = [];

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

    onDestroy() {
        // redefine me
    }

}