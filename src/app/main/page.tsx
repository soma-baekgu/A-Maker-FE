import RequestedEventList from "@/app/main/_component/requestedEventList";
import ReceivedEventList from "@/app/main/_component/receivedEventList";

export default function Main(){
    return(
        <>
            <RequestedEventList/>
            <ReceivedEventList/>
        </>
    );
}