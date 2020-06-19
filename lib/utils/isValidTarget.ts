
export function isValidTarget(params: {
    componentEl: Element;
    selector: string;
    target: Element;
}): boolean {
    let parent: Element | null = params.target;
    let insideComponent = false;
    let insideSelector = false;

    while ( parent ) {
        if ( "." + parent.className === params.selector ) {
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
