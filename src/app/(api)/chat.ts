import {authRequest} from "@/app/(api)/config";

const chatApi = {
    send: (chatRoomId:number, content:string) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats`, {content}),
    sendImg: (chatRoomId:number, path:string) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats/img`, {path}),
    sendFile: (chatRoomId:number, path:string) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats/file`, {path}),
    recentChat: (chatRoomId:number) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/recent`),
    previousChat: (chatRoomId:number, cursor:number, size:number) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/previous?cursor=${cursor}&size=${size}`),
    afterChat: (chatRoomId:number, cursor:number, size:number) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/chats/after?cursor=${cursor}&size=${size}`),
};

export default chatApi;