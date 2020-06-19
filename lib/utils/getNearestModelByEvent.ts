import { Model } from "../Model";

export function getNearestModelByEvent(event: any, ModelConstructor: new () => Model): Model | null {
    let parent: Element | null = event.target;

    while ( parent ) {
        const model = (parent as any)._model;
        
        if ( model instanceof ModelConstructor ) {
            return model;
        }

        parent = parent.parentElement;
    }

    return null;
}
