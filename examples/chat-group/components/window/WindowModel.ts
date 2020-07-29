import { Model } from "mvc-tsx";

export class WindowModel extends Model {
    title: string;
    width: number;
    height: number;
    
    constructor(title: string, width: number, height: number) {
        super();
        
        this.title = title;
        this.width = width;
        this.height = height;
    }
}