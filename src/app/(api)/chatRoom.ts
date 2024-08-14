import {authRequest} from "@/app/(api)/config";

const chatRoomApi = {
    getListJoined: (workspaceId: number) => authRequest.get(`/api/v1/workspaces/${workspaceId}/chat-rooms/joined`),
    getListNotJoined: (workspaceId: number) => authRequest.get(`/api/v1/workspaces/${workspaceId}/chat-rooms/not-joined`),
    create: (workspaceId: number, chatroomName: string) => authRequest.post(`/api/v1/workspaces/${workspaceId}/chat-rooms`, {name: chatroomName}),
    join: (workspaceId: number, chatRoomId: number) => authRequest.post(`/api/v1/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/join`),
    get: (chatroomId: number) => authRequest.get(`/api/v1/chat-rooms/${chatroomId}`)
};

export default chatRoomApi;