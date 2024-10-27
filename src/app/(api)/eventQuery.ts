import {authRequest} from "@/app/(api)/config";

const eventQueryAPi = {
    getEvents: (
        workspaceId: number,
        status: string
    ) => {
        return authRequest.get(`/api/v1/workspaces/${workspaceId}/events`, {
            params: {
                status
            }
        });
    }
}

export default eventQueryAPi;