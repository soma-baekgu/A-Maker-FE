import {authRequest} from "@/app/(api)/config";

const eventCommentApi = {
    createReplyComment: (eventId: number, content: string) => authRequest.post(`/api/v1/events/${eventId}/reply/comments`, {content}),
    readReplyComment: (eventId: number, page: number, size: number) => authRequest.get(`/api/v1/events/${eventId}/reply/comments`, {
        params: {page, size}
    }),
    createReactionComment: (eventId: number, optionId: number) => authRequest.post(`/api/v1/events/${eventId}/reaction/comments`, {optionId}),
    readReactionEventComment: (eventId: number) => authRequest.get(`/api/v1/events/${eventId}/reaction/comments`),
    createTaskComment: (eventId: number, path: string) => authRequest.post(`/api/v1/events/${eventId}/task/comments`, {path}),
}

export default eventCommentApi;