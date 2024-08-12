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
    ) => authRequest.get(`/api/v1/chat-rooms/${chatRoomId}/events/${eventId}/reply`)
}

export default eventApi;