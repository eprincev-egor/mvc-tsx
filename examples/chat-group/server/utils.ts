
/**
 * @see https://developer.mozilla.org/ru/docs/Web/API/File
 * @param file instanceof window.File
 * @returns Promise<string> string like are: "data:image/png;base64,iVBOR...."
 */
export function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            const base64 = (fileReader.result || "").toString();
            resolve(base64);
        };
        fileReader.onerror = (error) => {
            reject(error)
        };
    });
}

/**
 * sleep some time in range 30ms - 3000ms
 */
export async function sleepRandomTime(): Promise<void> {
    const randomPause = 30 + 3000 * Math.random();
    await sleep(randomPause);
}

/**
 * sleep some time, just async wrapper for setTimeout
 * @param ms timeout in milliseconds
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) =>
        setTimeout(resolve, ms)
    );
}

export function getRandomArrayElement<T extends any>(someArr: T[]): T | undefined {
    const randomIndex = Math.floor( Math.random() * someArr.length );
    const randomElement = someArr[ randomIndex ];
    return randomElement;
}

export function getRandomDateNearNow(): Date {
    const now = Date.now();
    const randomDelta = Math.random() * 10000 - 5000;
    const randomUnixTimestamp = now + randomDelta;
    const randomDate = new Date(randomUnixTimestamp);
    
    return randomDate;
}