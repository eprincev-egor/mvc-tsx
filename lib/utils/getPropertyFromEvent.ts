
export function getPropertyFromEvent(event: any, propertyPath: string[]) {
    let eventPropertyValue: any = event;

    for (const key of propertyPath) {
        eventPropertyValue = eventPropertyValue[ key ];
    }

    return eventPropertyValue;
}
