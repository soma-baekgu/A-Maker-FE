import fileApi from "@/app/(api)/file";
import axios, {AxiosRequestHeaders} from "axios";

export const getPreSignedUrl = async (targetName: string, ref: React.RefObject<HTMLInputElement>): Promise<string> => {
    const fileNameArray: string[] = targetName.split('.');
    const extension: string = fileNameArray.pop() || '';
    const name: string = fileNameArray.join('.');

    const res = await fileApi.getUrl(new Date().getTime().toString(), extension, name);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (evt) => {
            if (evt.target && ref && ref.current && ref.current.files && ref.current.files.length > 0) {
                try {
                    const binaryData = evt.target.result;
                    await axios.put(res.data.data, binaryData, {
                        headers: {
                            'Content-Type': ref.current.files![0].type
                        } as AxiosRequestHeaders
                    });
                    const url = new URL(res.data.data);
                    resolve(url.origin + url.pathname);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error("File reading failed"));
            }
        }
        reader.onerror = (evt) => reject(new Error("File reading failed"));
        if (ref.current && ref.current.files && ref.current.files.length > 0) {
            reader.readAsArrayBuffer(ref.current.files![0]);
        } else {
            reject(new Error("No file selected"));
        }
    });
}