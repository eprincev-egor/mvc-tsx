import { Model } from "./Model";
import { getListeners, isModelListener } from "./ControllerMeta";

export abstract class Controller<TModel extends Model> {
    protected model: Readonly<TModel>;

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

            this.model.on(eventType, (...args) => {
                listener.handler(...args);
            });
        }
    }
}