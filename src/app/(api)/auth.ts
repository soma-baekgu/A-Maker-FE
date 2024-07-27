import {request} from './config';

const authApi = {
    oauthUrl: () => request.get(`/api/v1/auth/oauth/google`),
    login: (authCode) => request.post(`/api/v1/auth/code/google?code=${authCode}`),
};

export default authApi;