import axios from "axios";


const setAuth = (isAuthenticated: boolean) =>
    (config) => {
        if (isAuthenticated) {
            const store = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE));
            const accessToken = store ? store.state.accessToken : null;
            if(!accessToken)
                window.location.href = '/login';
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

export const request = setApi(false);
export const authRequest = setApi(true);