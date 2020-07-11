import { Model } from "../Model";
import { View } from "../View";
type TViewConstructor<TModel extends Model> = new (...args: any[]) => View<TModel>;

export function isValidTarget(params: {
    componentEl: Element;
    selector: string | TViewConstructor<any>;
    target: Element;
}): boolean {

    if ( params.selector === "window" ) {
        return true;
    }

    let parent: Element | null = params.target;
    let insideComponent = false;
    let insideSelector = false;
    
    let elemMatchesSelector!: (elem: Element) => boolean;
    if ( typeof params.selector === "string" ) {
        const selectorClassName = params.selector.replace(".", "");

        elemMatchesSelector = (elem) =>
            elem.classList.contains(selectorClassName);
    }
    else {
        const ChildView = params.selector;
        elemMatchesSelector = (elem) =>
            (elem as any)._view instanceof ChildView;
    }

    while ( parent ) {
        if ( elemMatchesSelector(parent) ) {
            insideSelector = true;
        }

        if ( parent === params.componentEl ) {
            insideComponent = true;
            break;
        }

        parent = parent.parentElement;
    }

    return (
        insideComponent && 
        insideSelector
    );
}
