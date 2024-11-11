import axios from "axios";
import fileDownload from "js-file-download";

export const saveFile = async (path: string, fileName: string) => {
    try {
        const response = await axios.get(path, {
            responseType: 'blob',
        });
        fileDownload(response.data, fileName);
    } catch (error) {
        console.error('Error downloading the file', error);
    }
}