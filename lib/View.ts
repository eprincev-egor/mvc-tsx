import * as React from "react";
import * as ReactDOM from "react-dom";
import { Model } from "./Model";
import { mvcEvents } from "./mvcEvents";

/**
 * Base View layer
 * @extends React.Component
 */
export abstract class View<TModel extends Model> extends React.Component<{model: TModel}> {
    model!: TModel;

    /**
     * HTML Template.
     * Should be function who returns React template
     * @param model current model
     */
    abstract template(model: TModel): JSX.Element;

    constructor(props: Readonly<{model: TModel}>) {
        super(props);

        this.onChangeModel = this.onChangeModel.bind(this);

        this.model = props.model;
        this.state = this.getStateByModel(this.model);

        this.listenModelChanges();

        mvcEvents.emit("initView", {
            view: this,
            model: this.model
        });
    }

    render() {
        return this.template(this.model);
    }

    componentWillReceiveProps(newProps: {model: TModel}) {
        this.stopListenModel();

        this.model = newProps.model;
        this.listenModelChanges();

        const newState = this.getStateByModel(this.model);
        this.setState(newState);
    }

    componentDidMount() {
        const rootEl = ReactDOM.findDOMNode(this) as any;
        rootEl._view = this;
    }

    componentWillUnmount() {
        // clear memory leaks

        this.onDestroy();

        mvcEvents.emit("destroyView", {
            view: this,
            model: this.model
        });

        const rootEl = ReactDOM.findDOMNode(this) as any;
        delete rootEl._view;

        this.stopListenModel();
    }

    /**
     * Detach listeners and fix any memory leaks.
     * Should be any functions with clearing memory leaks.
     */
    onDestroy() {
        // redefine me
    }

    private stopListenModel() {
        this.model.off("change", this.onChangeModel);
    }

    private listenModelChanges() {
        this.model.on("change", this.onChangeModel);
    }

    private onChangeModel(changes: Partial<TModel>) {
        this.setState({
            ...changes
        });
    }

    private getStateByModel(model: TModel) {
        const newState: any = {
            ...this.model
        };

        const emitterProps = ["_events", "_eventsCount", "_maxListeners"];
        for (const emitterProp of emitterProps) {
            delete newState[ emitterProp ];
        }

        return newState;
    }

}
