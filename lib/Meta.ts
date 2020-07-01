import { Model } from "./Model";
import { Controller } from "./Controller";
import { View } from "./View";import { mvcEvents } from "./mvcEvents";
import { DOMListener } from "./DOMListener";
;

type TModelConstructor = new(...args: any[]) => Model;

export interface IHandlerArgs {
    methodName: string;
    argumentIndex: number;
    eventPropertyPath: TModelConstructor | string[]
}

export interface IListenerMeta {
    eventType: string;
    selector: string | TModelConstructor;
    methodName?: string;
    handler?: (...args: any[]) => void;
    handlerArgs?: HandlerArg[]; 
}

export type HandlerArg = string[] | TModelConstructor;

export interface IListener {
    eventType: string;
    selector: string | TModelConstructor;
    handlerArgs: HandlerArg[];
    handler: (...args: any[]) => void;
}

/**
 * Attach handler to View DOM events like are click, or model events.
 * ```js
 * class MyController extends Controller<MyModel> {
 * 
 *     // listen dom event
 *     *@on("click", MyView.ui.button)
 *     onClickButton() {
 *         // some action
 *     }
 * 
 * }
 * ```
 * @param eventTypeOrModel any DOM Event type or Model constructor
 * @param selectorOrModelEventType selector like are: ".my-class" or model eventType  
 * Selectors like are ".a .b .c" does not supported.
 */
export function on(
    eventTypeOrModel: keyof HTMLElementEventMap | TModelConstructor, 
    selectorOrModelEventType: string
) {
    let eventType!: string;
    let selector!: string | TModelConstructor;

    if ( typeof eventTypeOrModel === "string" ) {
        eventType = eventTypeOrModel;
        selector = selectorOrModelEventType;

        const selectorIsJustClassName = /^\.[\w-]+$/.test(selector);
        const selectorIsWindow = selector === "window";
        const isValidSelector = (
            selectorIsJustClassName ||
            selectorIsWindow
        );

        if ( !isValidSelector ) {
            throw new Error(`invalid selector "${selector}", selector should be just className like are ".some-class" or "window"`);
        }
    }
    else {
        eventType = selectorOrModelEventType;
        selector = eventTypeOrModel;
    }

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
    keyof MouseEvent |
    keyof KeyboardEvent |
    keyof DragEvent
)
/**
 * Get some value from event object
 * ```ts
 * class MyController extends Controller<MyModel> {
 * 
 *     *@on("change", MyView.ui.input)
 *     onChangeInput(
 *         // get changed input value:
 *         // event.target.value
 *         *@arg("target", "value") inputValue: string
 *     ) {
 *         // some action
 *     }
 * 
 * }
 * ```
 * @param firstKey keyof dom event object
 * @param secondKey keyof Event[firstKey], next step in property path.
 * @param otherPropertyPath other keys
 */
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

    listenersMeta.push(
        ...(controller as any).dynamicListeners
    );

    for (const listenerMeta of listenersMeta) {
        let handler: (...args: any[]) => void;
        let handlerArgs: HandlerArg[] = [];

        if ( listenerMeta.methodName ) {
            handler = (controller as any)[ listenerMeta.methodName ].bind(controller);

            handlerArgs = findHandlerArguments(
                controller, 
                listenerMeta.methodName
            );    
        }
        else {
            handler = listenerMeta.handler as (...args: any[]) => void;
            handlerArgs = listenerMeta.handlerArgs as HandlerArg[];
        }

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


export function findHandlerArguments(controller: Controller<any>, methodName: string): HandlerArg[] {
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
        typeof listener.selector !== "string"
    );
}

export function isDomListener(listener: IListener) {
    return !isModelListener(listener);
}

type TViewConstructor<TModel extends Model> = new (...args: any[]) => View<TModel>;
type TControllerConstructor<TModel extends Model> = new (...args: any[]) => Controller<TModel>;
type TCreateController<TModel extends Model> = (model: TModel) => Controller<TModel>;

/**
 * For every instance of ViewConstructor will created instance of CreateController
 * ```ts
 * // bind by classes
 * *@forView(MyView)
 * class MyController extends Controller<MyModel> {}
 * 
 * // or create controller instance manually
 * *@forView(MyView, (model: MyModel) => 
 *    new MyController(model, ...someOptions)
 * )
 * class MyController extends Controller<MyModel> {}
 * 
 * ````
 * @param ViewConstructor for every this View
 * @param CreateController create this Controller
 */
export function forView<TModel extends Model>(
    ViewConstructor: TViewConstructor<TModel>,
    CreateController?: TCreateController<TModel>
) {
    return (ControllerClass: TControllerConstructor<TModel>) => {
        mvcEvents.on("initView", (event: {view: any, model: any}) => {
            if ( !(event.view instanceof ViewConstructor) ) {
                return;
            }

            createControllersForView(event.view, event.model);
        });

        function createControllersForView(view: View<any>, model: TModel) {

            const originalEmit = model.emit;
            model.emit = (eventType: string) => {
                throw new Error(`${ControllerClass.name}: it is forbidden to emit any model event inside the controller constructor. Triggered "${eventType}"`);
            };

            const controller = CreateController ? 
                CreateController(model) :
                new ControllerClass(model);
            
            const listenersMeta = getListeners(controller);
            const domListenersMeta = listenersMeta.filter(isDomListener);
            const domListeners: DOMListener[] = [];
    
            for (const meta of domListenersMeta) {
                const domListener = new DOMListener({
                    eventType: meta.eventType as keyof HTMLElementEventMap,
                    selector: meta.selector as string,
                    handlerArgs: meta.handlerArgs,
                    handler: meta.handler,
                    view
                });

                domListener.listen(); 
                domListeners.push(domListener);
            }

            mvcEvents.once("destroyView", (event: {view: View<any>}) => {
                if ( event.view !== view ) {
                    return;
                }

                for (const domListener of domListeners) {
                    domListener.destroy();
                }

                controller.destroy();
                domListeners.splice(0);
            });
            
            model.emit = originalEmit;
        }

    };
}
