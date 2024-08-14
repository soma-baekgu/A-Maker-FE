import {authRequest} from "@/app/(api)/config";

const workspaceApi = {
    getList: () => authRequest.get('/api/v1/workspaces'),
    create: (workspaceName: string) => authRequest.post('/api/v1/workspaces', {
        name: workspaceName,
        inviteesEmails: []
    }),
    recent: () => authRequest.get('/api/v1/workspaces/default'),
    invite: (workspaceId: number, email: string) => authRequest.post(`/api/v1/workspaces/${workspaceId}/invite`, {}, {params: {email}}),
    approve: (workspaceId: number) => authRequest.put(`/api/v1/workspaces/${workspaceId}/invite/activate`),
    get: (workspaceId: number) => authRequest.get(`/api/v1/workspaces/${workspaceId}`),
    getUsers: (workspaceId: number) => authRequest.get(`/api/v1/workspaces/${workspaceId}/users`),
}

export default workspaceApi;