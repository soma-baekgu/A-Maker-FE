// types.ts
export type FileContent = {
    path: string,
    fileName: string,
};

export type ReplyEventContent = {
    eventTitle: string,
    deadLine: string,
    notificationStartTime: string,
    notificationInterval: number,
    users: string[],
    finishedCount: number,
    totalAssignedCount: number,
};

export type ChatContent = string | FileContent | ReplyEventContent;

export function isFileContent(content: ChatContent): content is FileContent {
    return typeof content === 'object' && 'path' in content && 'fileName' in content;
}

export function isReplyEventContent(content: ChatContent): content is ReplyEventContent {
    return typeof content === 'object' && 'eventTitle' in content && 'deadLine' in content;
}

export function isString(content: ChatContent): content is string {
    return typeof content === 'string';
}