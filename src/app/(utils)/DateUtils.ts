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