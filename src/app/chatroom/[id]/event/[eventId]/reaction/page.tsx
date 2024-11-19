"use client";

import styles from "./page.module.css";
import TopBar2 from "@/app/_component/TopBar2";
import {useEffect, useState} from "react";
import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";
import eventApi from "@/app/(api)/event";
import eventCommentApi from "@/app/(api)/eventComment";
import {useStore} from "@/app/store";

interface Option {
    id: number,
    eventId: number,
    content: string
}

interface ReactionEventData extends EventData {
    options: Option[]
}

interface StoreState {
    email: string;
}

interface VotedOption {
    id: number,
    eventId: number,
    content: string,
    comments: {
        id: number,
        createAt: string,
        updatedAt: string,
        userDto: User,
    }[]
}

export default function Page(props: {
    params: {
        id: string,
        eventId: string
    }
}) {
    const chatRoomId: number = Number(props.params.id);
    const eventId: number = Number(props.params.eventId);
    const [event, setEvent] = useState<ReactionEventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number>();
    const {email} = useStore() as StoreState;
    const [isVoted, setIsVoted] = useState(false);
    const [totalVoterCount, setTotalVoterCount] = useState(10);
    const [voterCount, setVoterCount] = useState<Map<number, number>>(new Map());
    const [votedOption, setVotedOption] = useState<number>();
    const [isAvailable, setIsAvailable] = useState(false);
    const [votedOptions, setVotedOptions] = useState<VotedOption[]>([]);

    const loadEventData = async () => {
        const res = await eventApi.readReactionEvent(chatRoomId, eventId);
        setEvent(res.data.data);
        setIsVoted(getIsVoted(res.data.data.finishUser));

        const res2 = await eventCommentApi.readReactionEventComment(eventId);
        const tempMap = new Map<number, number>();
        let tempCnt = 0;
        setVotedOptions(res2.data.data);
        res2.data.data.forEach((option: VotedOption) => {
            tempMap.set(option.id, option.comments.length);
            tempCnt += option.comments.length;
            if (option.comments.some((comment) => comment.userDto.email == email)) {
                setVotedOption(option.id);
            }
        })
        setVoterCount(tempMap);
        setTotalVoterCount(tempCnt);
    }

    const createEventComment = async (optionId: number | undefined) => {
        if (!optionId) return;
        await eventCommentApi.createReactionComment(eventId, optionId);
        loadEventData();
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(Number(e.target.value));
    }

    const getIsVoted = (finishUsers: User[]): boolean => {
        return finishUsers.some((user: User) => user.email == email);
    }

    function areAllWaitingUsersInComments(event: EventData, options: VotedOption[]): boolean {
        const optionEmails = options.map(option => option.comments.map(comment => comment.userDto.email)).flat();
        return event.waitingUser.every(user => optionEmails.includes(user.email));
    }

    useEffect(() => {
        loadEventData().then(
            () => setIsLoaded(true)
        )
    }, []);

    useEffect(() => {
        if (event?.waitingUser.some((user: User) => user.email == email) ||
            event?.finishUser.some((user: User) => user.email == email))
            setIsAvailable(true);
    }, [event]);


    return (
        <div className={styles.page}>
            <TopBar2 title={"이벤트 상세"}/>
            {isLoaded && event ? (
                <div className={styles.main}>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            <div className={styles.titleText}>{event.eventTitle}</div>
                            {areAllWaitingUsersInComments(event, votedOptions) &&
                                <div className={styles.status}>
                                    <div className={styles.statusText}>완료</div>
                                </div>
                            }
                        </div>
                        <EventInfo event={event} type={"reaction"}/>
                    </div>
                    <div className={styles.choice}>
                        {event.options.map((option, index) => (
                            <div className={styles.item} key={index}>
                                {isAvailable && event && !areAllWaitingUsersInComments(event, votedOptions) &&
                                    <input
                                        className={styles.checkbox}
                                        type="radio"
                                        name={"vote"}
                                        value={option.id}
                                        onChange={handleOptionChange}
                                    />}
                                {isVoted ?
                                    <div className={styles.optionBackground}>
                                        <div
                                            className={styles.optionBar}
                                            style={
                                                {width: `${(voterCount.get(option.id) ?? 0) * 100 / totalVoterCount}%`}
                                            }
                                        ></div>
                                        <div
                                            className={styles.frontText + (votedOption == option.id ? ' ' + styles.votedText : '')}>{option.content}</div>
                                        <div
                                            className={styles.frontText + (votedOption == option.id ? ' ' + styles.votedText : '')}>
                                            {`${(voterCount.get(option.id) ?? 0)}명(${(voterCount.get(option.id) ?? 0) * 100 / totalVoterCount}%)`}
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.optionDefaultBackground}>
                                        {option.content}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    {isAvailable && event && !areAllWaitingUsersInComments(event, votedOptions) &&
                        <div className={selectedOption ? styles.button : styles.disableButton} onClick={() => {
                            if (!selectedOption) return;
                            createEventComment(selectedOption);
                        }}>응답
                        </div>}
                    <div className={styles.empty}></div>
                </div>
            ) : (
                <div className={styles.main}>Loading...</div>
            )}
        </div>
    )
}