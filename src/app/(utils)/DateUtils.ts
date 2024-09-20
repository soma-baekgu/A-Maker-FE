const isDifferentDay = (date1: Date, date2: Date) => {
    return date1.getDate() !== date2.getDate() ||
        date1.getMonth() !== date2.getMonth() ||
        date1.getFullYear() !== date2.getFullYear();
}

export const timeAgo = (date: Date) => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {month: 'long', day: 'numeric'};
    if (isDifferentDay(now, date))
        return date.toLocaleDateString('ko-KR', options);

    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    if (diffInMinutes < 1)
        return `방금`;
    else if (diffInMinutes >= 60)
        return `${Math.floor(diffInMinutes / 60)}시간 전`;
    else
        return `${diffInMinutes}분 전`;
}

export const timeAfter = (date: Date): string => {
    const diff = date.getTime() - new Date().getTime();

    if (diff <= 0) {
        return '마감';
    }

    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
        return `${diffInDays}일 후 마감`;
    } else if (diffInHours > 0) {
        return `${diffInHours}시간 후 마감`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes}분 후 마감`;
    } else {
        return `${diffInSeconds}초 후 마감`;
    }
}