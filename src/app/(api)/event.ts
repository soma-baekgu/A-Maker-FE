import {authRequest} from "@/app/(api)/config";

const eventApi = {
    createReplyEvent: (
        chatRoomId: number,
        eventTitle: string,
        eventDetails: string,
        assignees: string[],
        deadLine: Date,
        notificationStartHour: number,
        notificationStartMinute: number,
        interval: number
    ) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/events/reply`, {
        eventTitle,
        eventDetails,
        assignees,
        deadLine,
        notificationStartHour,
        notificationStartMinute,
        interval
    }),

    readReplyEvent: (
        chatRoomId: number,
        eventId: number,
    ) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/events/${eventId}/reply`),

    createReactionEvent: (
        chatRoomId: number,
        eventTitle: string,
        options: string[],
        assignees: string[],
        deadLine: Date,
        notificationStartHour: number,
        notificationStartMinute: number,
        interval: number
    ) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/events/reaction`, {
        eventTitle,
        options,
        assignees,
        deadLine,
        notificationStartHour,
        notificationStartMinute,
        interval
    }),

    readReactionEvent: (
        chatRoomId: number,
        eventId: number,
    ) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/events/${eventId}/reaction`),

    createTaskEvent: (
        chatRoomId: number,
        eventTitle: string,
        eventDetails: string,
        assignees: string[],
        deadLine: Date,
        notificationStartHour: number,
        notificationStartMinute: number,
        interval: number
    ) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/events/task`, {
        eventTitle,
        eventDetails,
        assignees,
        deadLine,
        notificationStartHour,
        notificationStartMinute,
        interval
    }),
    readTaskEvent: (
        chatRoomId: number,
        eventId: number,
    ) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/events/${eventId}/task`),
}

export default eventApi;