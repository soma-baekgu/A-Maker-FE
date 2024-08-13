import styles from './recipientSelector.module.css';
import {useState} from "react";

type Props = {
    assignees: string[],
    setAssignees: (assignees: string[]) => void
}

export default function RecipientSelector({assignees, setAssignees}: Props) {

    const recipients = [
        {name: '노영진', image: 'image1.png', email: 'shane9747@gmail.com'},
        {name: '백구', image: 'image2.png', email: 'soma.backgu@gmail.com'},
    ];

    const [checkedState, setCheckedState] = useState(
        recipients.reduce((state, recipient) => ({
            ...state,
            [recipient.email]: false
        }), {})
    );

    const handleCheckboxChange = (email: string) => (event) => {
        const newCheckedState = {...checkedState, [email]: event.target.checked};
        setCheckedState(newCheckedState);
        const newAssignees = recipients.filter(recipient => newCheckedState[recipient.email]).map(recipient => recipient.email);
        setAssignees(newAssignees);
    }

    return (
        <div className={styles.component}>
            <div className={styles.description}>답변을 요청할 인원</div>
            {recipients.map((recipient, index) => (
                <div className={styles.element} key={index}>
                    <div className={styles.image}></div>
                    <div className={styles.name}>{recipient.name}</div>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={checkedState[recipient.email] || false}
                        onChange={handleCheckboxChange(recipient.email)}
                    />
                </div>
            ))}
        </div>
    );
}