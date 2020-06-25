import * as React from "react";
import * as ReactDOM from "react-dom";
import { Model } from "./Model";
import { Controller } from "./Controller";
import { DOMEvents } from "./DOMEvents";

const domEvents = new DOMEvents();

/**
 * Base View layer
 * @extends React.Component
 */
export abstract class View<TModel extends Model> extends React.Component<{model: TModel}> {
    model!: TModel;
    protected controllersInstances!: Controller<TModel>[];
    
    /**
     * HTML Template.
     * Should be function who returns React template
     * @param model current model
     */
    abstract template(model: TModel): JSX.Element;

    constructor(props: Readonly<{model: TModel}>) {
        super(props);

        this.model = props.model;
        this.createControllers();
        this.listenModelChanges();
    }

    private createControllers() {
        const Controllers = this.controllers(this.model);
        this.controllersInstances = [];

        const originalEmit = this.model.emit;
        let CurrentConstructor: any;

        this.model.emit = (eventType: string) => {
            throw new Error(`${CurrentConstructor.name}: it is forbidden to emit any model event inside the controller constructor. Triggered "${eventType}"`);
        };

        for (const ConstructorOrInstance of Controllers) {
            if ( typeof ConstructorOrInstance === "function" ) {
                CurrentConstructor = ConstructorOrInstance;

                const controller = new CurrentConstructor(this.model);
                domEvents.addController(controller, this);
            
                this.controllersInstances.push(controller);
            }
            else {
                const controller = ConstructorOrInstance;
                CurrentConstructor = controller.constructor;
                
                domEvents.addController(controller, this);

                this.controllersInstances.push(controller);
            }
        }

        this.model.emit = originalEmit;
    }

    private listenModelChanges() {
        this.model.on("change", (changes) => {
            this.setState({changes});
        });
    }

    render() {
        return this.template(this.model);
    }

    componentDidMount() {
        const rootEl = ReactDOM.findDOMNode(this) as any;
        rootEl._model = this.model;
    }

    componentWillUnmount() {
        // clear memory leaks

        this.onDestroy();

        const rootEl = ReactDOM.findDOMNode(this) as any;
        delete rootEl._model;

        domEvents.destroyListeners(this);
        
        for (const controller of this.controllersInstances) {
            controller.destroy();
        }
        
        this.controllersInstances = [];
    }

    /**
     * Detach listeners and fix any memory leaks.
     * Should be any functions with clearing memory leaks.
     */
    onDestroy() {
        // redefine me
    }

    /**
     * Register controllers.  
     * Should be function who returns list of Controllers constructors
     */
    controllers(model: TModel): (
        (new (model: TModel) => Controller<TModel>) |
        Controller<TModel>
    )[] {
        return [];
    }
}
