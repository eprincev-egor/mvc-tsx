import { Model } from "../lib";
import assert from "assert";

describe("Model", () => {

    it("set one field", () => {
        class MyModel extends Model {
            field: string | undefined;
        }

        const model = new MyModel();
        assert.strictEqual(model.field, undefined, "default value is undefined");

        model.set({
            field: "first value"
        });

        assert.strictEqual(model.field, "first value", "model has field, after call set()");
    });

    it("listen changes", () => {
        class UserModel extends Model {
            name: string;
            email: string;

            constructor(name: string, email: string) {
                super();

                this.name = name;
                this.email = email;
            }
        }

        const user = new UserModel("Bob", "bob@bob.com");
        
        let actualChanges: any = {};
        user.on("change", (changes) => {
            actualChanges = changes;
        });

        user.set({
            name: "Bob",
            email: "bob@gmail.com"
        });

        assert.deepStrictEqual(actualChanges, {
            email: "bob@gmail.com"
        });
    });

    it("if no changes, then no emit event", () => {

        class CompanyModel extends Model {
            name: string;

            constructor(name: string) {
                super();
                this.name = name;
            }
        }

        const company = new CompanyModel("some company");
        
        let triggerCounter = 0;
        company.on("change", () =>
            triggerCounter++
        );

        company.set({
            name: "some company"
        });
        assert.equal(triggerCounter, 0, "call set() with same data");

        company.set({
            name: "new company"
        });
        assert.equal(triggerCounter, 1, "call set() with new data");
    });

});