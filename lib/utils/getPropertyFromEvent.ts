
export function getPropertyFromEvent(
    event: any, 
    currentTarget: any,
    propertyPath: string[]
) {
    let eventPropertyValue: any = event;

    for (const key of propertyPath) {
        let nextValue = eventPropertyValue[ key ];

        if ( key === "currentTarget" ) {
            nextValue = currentTarget;
        }
        else if ( typeof nextValue === "function" ) {
            nextValue = nextValue.bind(eventPropertyValue);
        }
        
        eventPropertyValue = nextValue;
    }

    return eventPropertyValue;
}
