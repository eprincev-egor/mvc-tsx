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
        const Constructors = this.controllers();
        this.controllersInstances = [];

        for (const Constructor of Constructors) {
            const controller = this.createController(Constructor);
            this.controllersInstances.push(controller);
        }
    }

    private createController(ControllerConstructor: new (model: TModel) => Controller<TModel>) {
        const controller = new ControllerConstructor(this.model);
        domEvents.addController(controller, this);

        return controller;
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
    controllers(): (new (model: TModel) => Controller<TModel>)[] {
        return [];
    }
}
