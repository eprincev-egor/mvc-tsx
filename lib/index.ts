import * as React from "react";
import * as ReactDOM from "react-dom";
import {EventEmitter} from "events";

import {on, arg, forView} from "./Meta";
import {Model} from "./Model";
import {View} from "./View";
import {Controller} from "./Controller";

export {
    React,
    ReactDOM,
    EventEmitter,
    Model,
    View,
    Controller,
    on,
    arg,
    forView
};

if ( typeof window !== "undefined" ) {
    const windowObj = window as any;
    windowObj.MVC = {
        React,
        ReactDOM,
        EventEmitter,
        Model,
        View,
        Controller,
        on,
        arg,
        forView
    };

    if ( !windowObj.React ) {
        windowObj.React = React;
    }
    if ( !windowObj.ReactDOM ) {
        windowObj.ReactDOM = ReactDOM;
    }
    if ( !windowObj.EventEmitter ) {
        windowObj.EventEmitter = EventEmitter;
    }
}