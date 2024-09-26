export interface EventData {
    id: number,
    eventTitle: string,
    eventDetails: string,
    deadLine: string,
    notificationStartTime: string,
    notificationInterval: number,
    eventCreator: User,
    finishUser: User[],
    waitingUser: User[]
}

export interface User {
    name: string,
    email: string,
    picture: string
}