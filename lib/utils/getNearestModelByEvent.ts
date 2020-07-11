import { Model } from "../Model";

export function getNearestModelByEvent(event: any, ModelConstructor: new () => Model): Model | null {
    let parent: Element | null = event.target;

    while ( parent ) {
        const view = (parent as any)._view;
        
        if ( view ) {
            const model = view.model;
        
            if ( model instanceof ModelConstructor ) {
                return model;
            }    
        }
        

        parent = parent.parentElement;
    }

    return null;
}
