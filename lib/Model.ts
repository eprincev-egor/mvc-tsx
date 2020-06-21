import { EventEmitter } from "events";

/**
 * Base Model layer 
 * @extends EventEmitter
 */
export abstract class Model extends EventEmitter {

    /**
     * Apply changes to model and emit changes to listeners.  
     * @param props changes to apply on model
     * @param options any options, who will transferred to all listeners
     * @fires change
     */
    set(props: Partial<this>, options: any = {}) {
        const changes: Partial<this> = {};
        let hasChanges = false;

        for (const key in props) {
            const newValue = props[ key ] as this[ typeof key ];
            const oldValue = this[ key ];

            if ( newValue !== oldValue ) {
                hasChanges = true;
                this[ key ] = newValue;
                changes[ key ] = newValue;
            }
        }

        if ( hasChanges ) {
            /**
             * change event
             *
             * @event change
             * @type {Partial<this>} changes
             */
            this.emit("change", changes, options);
        }
    }

    /**
     * listen event
     * @param event eventType, can be: "change"
     * @param handler function, who will called on event
     */
    on(event: "change", handler: (changes: Partial<this>, options: any) => void): this;
    on(event: string, handler: (...args: any[]) => void): this {
        return super.on(event, handler);
    }
}