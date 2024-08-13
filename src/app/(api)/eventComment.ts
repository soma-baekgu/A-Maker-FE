import {authRequest} from "@/app/(api)/config";

const eventCommentApi = {
    createReplyComment: (eventId: number, content: string) => authRequest.post(`/api/v1/events/${eventId}/reply/comments`, {content}),
    readReplyComment: (eventId: number, page: number, size: number) => authRequest.get(`/api/v1/events/${eventId}/reply/comments`, {
        params: {page, size}
    }),
}

export default eventCommentApi;