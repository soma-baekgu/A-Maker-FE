import {saveFile} from "@/app/chatroom/fileSaver";
import Image from "next/image";
import styles from "./fileDownloader.module.css";

export default function FileDownloader({path, fileName}: {
    path: string,
    fileName: string
}) {
    const onSave = async () => {
        await saveFile(path, fileName);
    }

    return (
        <div className={styles.component} onClick={onSave}>
            <div>
                <Image src="/down.png" alt="down" width={16} height={16}/>
            </div>
            저장하기
        </div>
    );
}