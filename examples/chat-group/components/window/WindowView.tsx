import React from "react";
import { View } from "mvc-tsx";
import { WindowModel } from "./WindowModel";
import "./Window.css";

export class WindowView extends View<WindowModel> {
    
    template(windowModel: WindowModel) {
        return <div className="Window">
            <div className="Window--head">
                <div className="Window--title fas fa-arrows-alt">{windowModel.title}</div>
                <div className="Window--buttons">
                    <div className="Window--helpButton fas fa-question"></div>
                    <div className="Window--minimizeButton fas fa-minus"></div>
                    <div className="Window--maximizeButton fas fa-desktop"></div>
                    <div className="Window--closeButton fas fa-times"></div>
                </div>
            </div>

            <div className="Window--content">
                {this.props.children}
            </div>
        </div>
    }
}