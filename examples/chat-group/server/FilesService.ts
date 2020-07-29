import {convertFileToBase64} from "./utils";

export class FilesService {

    async uploadFile(file: File) {
        const base64 = await convertFileToBase64(file);
        return base64;
    }
    
}

