import {authRequest} from "@/app/(api)/config";

const fileApi = {
    getUrl: (path:string, extension:string, name:string) => authRequest.get(`/api/v1/file/url`, {
        params: {
            path,
            extension,
            name
        }
    }),
};
export default fileApi;