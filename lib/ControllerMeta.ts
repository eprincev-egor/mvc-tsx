import { Model } from "./Model";
import { Controller } from "./Controller";

export interface IHandlerArgs {
    methodName: string;
    argumentIndex: number;
    eventPropertyPath: (new(...args: any[]) => Model) | string[]
}

export interface IListenerMeta {
    eventType: keyof HTMLElementEventMap;
    selector: string;
    methodName: string;
}

export type HandlerArg = string[] | (new (...args: any[]) => Model);

export interface IListener {
    eventType: keyof HTMLElementEventMap;
    selector: string;
    handlerArgs: HandlerArg[];
    handler: (...args: any[]) => void;
}


export function on(eventType: keyof HTMLElementEventMap, selector: string) {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {

        if ( !target._listenersMeta ) {
            target._listenersMeta = [];
        }
        
        const meta: IListenerMeta = {
            eventType,
            selector,
            methodName
        };
        target._listenersMeta.push(meta);
    };
}

type KeyOfDOMEvent = (
    keyof Event |
    keyof MouseEvent 
)
export function arg<T extends KeyOfDOMEvent | (new (...args: any[]) => Model)>(
    firstKey?: T,
    secondKey?: (
        T extends keyof Event ?
            (Event[T] extends Event["target"] ? 
                keyof HTMLElement | keyof HTMLInputElement :
                keyof Event[T]
            ) :
            never
    ),
    ...otherPropertyPath: string[]
) {
    return (target: any, methodName: string, argumentIndex: number) => {
        if ( !target._handlersArguments ) {
            target._handlersArguments = [];
        }

        const handlerArgs: IHandlerArgs = {
            methodName,
            argumentIndex,
            eventPropertyPath: []
        };

        if ( typeof firstKey === "string" ) {
            const propertyPath: string[] = [
                firstKey as string
            ];

            if ( secondKey ) {
                propertyPath.push(secondKey as string);
            }
            if ( otherPropertyPath.length ) {
                propertyPath.push( ...otherPropertyPath );
            }
    
            handlerArgs.eventPropertyPath = propertyPath;
        }
        else {
            const ModelConstructor = firstKey as new (...args: any[]) => Model;
            handlerArgs.eventPropertyPath = ModelConstructor;
        }

        target._handlersArguments.push(handlerArgs);
        
    };
}

export function getListeners(controller: Controller<any>) {
    const proto = controller.constructor.prototype;
    const listenersMeta = (proto._listenersMeta || [] )as IListenerMeta[];
    const listeners: IListener[] = [];

    for (const listenerMeta of listenersMeta) {
        const handler = (controller as any)[ listenerMeta.methodName ].bind(controller);
        const handlerArgs = findHandlerArguments(
            controller, 
            listenerMeta.methodName
        );

        const listener: IListener = {
            eventType: listenerMeta.eventType,
            selector: listenerMeta.selector,
            handlerArgs,
            handler
        };
        listeners.push(listener);
    }

    return listeners;
}


function findHandlerArguments(controller: Controller<any>, methodName: string): HandlerArg[] {
    const proto = controller.constructor.prototype;

    const handlersArguments: IHandlerArgs[] = proto._handlersArguments || [];
    const handlerArgs = handlersArguments
        .filter(someArgs =>
            someArgs.methodName === methodName
        )
        .sort((a, b) =>
            a.argumentIndex - b.argumentIndex
        )
        .map(someArgs =>
            someArgs.eventPropertyPath
        );
    
    return handlerArgs;
}

export function isModelListener(listener: IListener) {
    return (
        listener.eventType === "change" &&
        listener.selector === "model"
    );
}

export function isDomListener(listener: IListener) {
    return !isModelListener(listener);
}