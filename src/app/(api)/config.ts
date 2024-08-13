import axios, {InternalAxiosRequestConfig} from "axios";


const setAuth = (isAuthenticated: boolean) =>
    (config:InternalAxiosRequestConfig) => {
        if (isAuthenticated) {
            if(!process.env.NEXT_PUBLIC_LOCAL_STORAGE) {
                window.location.href = '/login';
                return config;
            }
            const storage = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE);
            if (!storage){
                window.location.href = '/login';
                return config;
            }
            const store = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE));
            const accessToken = store ? store.state.accessToken : null;
            if(!accessToken) {
                window.location.href = '/login';
                return config;
            }
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }

const setApi = (isAuthenticated: boolean) => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        timeout: 5000,
    });
    instance.interceptors.request.use(
        setAuth(isAuthenticated),
        error => Promise.reject(error.response)
    );
    instance.interceptors.response.use(
        response => response,
        error => Promise.reject(error.response)
    );
    return instance;
};

const setApiCustom=(baseURL:string)=>{
    const instance = axios.create({
        baseURL,
        timeout: 5000,
    });
    instance.interceptors.request.use(
        setAuth(true),
        error => Promise.reject(error.response)
    );
    instance.interceptors.response.use(
        response => response,
        error => Promise.reject(error.response)
    );
    return instance;
}

export const request = setApi(false);
export const authRequest = setApi(true);

