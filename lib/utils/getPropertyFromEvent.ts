
export function getPropertyFromEvent(event: any, propertyPath: string[]) {
    let eventPropertyValue: any = event;

    for (const key of propertyPath) {
        let nextValue = eventPropertyValue[ key ];

        if ( typeof nextValue === "function" ) {
            nextValue = nextValue.bind(eventPropertyValue);
        }
        
        eventPropertyValue = nextValue;
    }

    return eventPropertyValue;
}
