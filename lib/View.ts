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

    static ui: {
        [elementName: string]: string
    } = {};

    /**
     * HTML Template.
     * Should be function who returns React template
     * @param model current model
     */
    abstract template(model: TModel): JSX.Element;

    constructor(props: Readonly<{model: TModel}>) {
        super(props);

        this.model = props.model;
        this.listenModelChanges();

        mvcEvents.emit("initView", {
            view: this,
            model: this.model
        });
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
    }

    /**
     * Detach listeners and fix any memory leaks.
     * Should be any functions with clearing memory leaks.
     */
    onDestroy() {
        // redefine me
    }
}
