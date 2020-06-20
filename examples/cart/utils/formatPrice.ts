
export function formatPrice(price: number): string {
    let [intPart, floatPart] = price.toString().split(".");

    if ( !floatPart ) {
        floatPart = "00";
    }
    else if ( floatPart.length === 1 ) {
        floatPart = floatPart + "0";
    }
    else if ( floatPart.length > 2 ) {
        floatPart = floatPart.slice(0, 2);
    }

    const output =  intPart + "." + floatPart;
    return output;
}