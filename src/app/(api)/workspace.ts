import {authRequest} from "@/app/(api)/config";

const workspaceApi = {
    getList: () => authRequest.get('/api/v1/workspaces'),
    create: (workspaceName) => authRequest.post('/api/v1/workspaces', {name: workspaceName, inviteesEmails: []}),
    recent: () => authRequest.get('/api/v1/workspaces/default'),
    invite: (workspaceId, email) => authRequest.post(`/api/v1/workspaces/${workspaceId}/invite`, {}, {params: {email}}),
    approve: (workspaceId) => authRequest.put(`/api/v1/workspaces/${workspaceId}/invite/activate`)
}

export default workspaceApi;