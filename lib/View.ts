import * as React from "react";
import * as ReactDOM from "react-dom";
import { Model } from "./Model";
import { Controller } from "./Controller";
import { DOMEvents } from "./DOMEvents";

const domEvents = new DOMEvents();

export abstract class View<TModel extends Model> extends React.Component<{model: TModel}> {
    model!: TModel;
    protected controllersInstances!: Controller<TModel>[];
    
    abstract template(state: TModel): JSX.Element;

    constructor(props: Readonly<{model: TModel}>) {
        super(props);

        this.initModel(props.model);
        this.createControllers();
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

    private initModel(model: TModel) {
        this.model = model;
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

    controllers(): (new (model: TModel) => Controller<TModel>)[] {
        return [];
    }
}
