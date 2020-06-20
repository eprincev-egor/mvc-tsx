import { Model } from "mvc-tsx";
import { ProductModel } from "../product/ProductModel";
import { CartPositionModel } from "./position/CartPositionModel";

export class CartModel extends Model {
    positions: CartPositionModel[] = [];
    totalPrice: number = 0;

    addProduct(product: ProductModel) {

        const existentPosition = this.getPositionByName(product.name);

        if ( existentPosition ) {
            existentPosition.incrementQuantity();
        }
        else {
            this.createNewPosition(product);
        }

        this.recalculateTotalPrice();
    }

    incrementPositionQuantity(position: CartPositionModel) {
        position.incrementQuantity();
        this.recalculateTotalPrice();
    }

    decrementPositionQuantity(position: CartPositionModel) {
        position.decrementQuantity();

        if ( position.quantity === 0 ) {
            this.removePosition(position);
        }

        this.recalculateTotalPrice();
    }

    clear() {
        const cart: CartModel = this;

        cart.set({
            positions: [],
            totalPrice: 0
        });
    }

    private getPositionByName(productName: string) {
        const existentPosition = this.positions.find(position =>
            position.product.name === productName
        );
        return existentPosition;
    }

    private createNewPosition(product: ProductModel) {
        const cart: CartModel = this;

        const newPosition = new CartPositionModel(product);
        const newPositions = [...cart.positions, newPosition];

        cart.set({
            positions: newPositions
        });
    }

    private removePosition(position: CartPositionModel) {
        const cart: CartModel = this;
        const positionIndex = cart.positions.indexOf(position);

        if ( positionIndex !== -1 ) {
            const newPositions = [...cart.positions];
            newPositions.splice(positionIndex, 1);

            cart.set({
                positions: newPositions
            });
        }
    }

    private recalculateTotalPrice() {
        const cart: CartModel = this;

        const newTotalPrice = cart.positions.reduce((totalPrice, position) =>
            totalPrice + position.total,
            0
        );

        cart.set({
            totalPrice: newTotalPrice
        });
    }
}
