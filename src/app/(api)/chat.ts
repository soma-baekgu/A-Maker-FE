import {authRequest} from "@/app/(api)/config";

const chatApi = {
    send: (chatRoomId, content) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats`, {content}),
    sendImg: (chatRoomId, path) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats/img`, {path}),
    sendFile: (chatRoomId, path) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats/file`, {path}),
    recentChat: (chatRoomId) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/recent`),
    previousChat: (chatRoomId, cursor, size) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/previous?cursor=${cursor}&size=${size}`),
    afterChat: (chatRoomId, cursor, size) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/after?cursor=${cursor}&size=${size}`),
};

export default chatApi;