import {authRequest} from "@/app/(api)/config";

const chatRoomApi = {
    getListJoined: (workspaceId) => authRequest.get(`/api/v1/workspaces/${workspaceId}/chat-rooms/joined`),
    getListNotJoined: (workspaceId) => authRequest.get(`/api/v1/workspaces/${workspaceId}/chat-rooms/not-joined`),
    create: (workspaceId, chatroomName) => authRequest.post(`/api/v1/workspaces/${workspaceId}/chat-rooms`, {name: chatroomName}),
};

export default chatRoomApi;