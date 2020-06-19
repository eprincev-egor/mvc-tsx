import { EventEmitter } from "events";

export abstract class Model extends EventEmitter {

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
            this.emit("change", changes, options);
        }
    }

    on(event: "change", handler: (changes: Partial<this>) => void): this;
    on(event: string, handler: (...args: any[]) => void): this {
        return super.on(event, handler);
    }
}