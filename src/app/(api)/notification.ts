import {authRequest} from "@/app/(api)/config";

const notificationApi = {
    getNotifications: (
        workspaceId: number,
        page: number
    ) => {
        return authRequest.get(`/api/v1/workspaces/${workspaceId}/notifications`, {
            params: {
                page: page,
                size: 100
            }
        });
    },
}

export default notificationApi;