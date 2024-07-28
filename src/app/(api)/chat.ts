import {authRequest} from "@/app/(api)/config";

const chatApi = {
    send: (chatRoomId, content) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats`, {content}),
    recentChat: (chatRoomId) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/recent`),
    previousChat: (chatRoomId, cursor, size) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/previous?cursor=${cursor}&size=${size}`),
    afterChat: (chatRoomId, cursor, size) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/after?cursor=${cursor}&size=${size}`),
};

export default chatApi;