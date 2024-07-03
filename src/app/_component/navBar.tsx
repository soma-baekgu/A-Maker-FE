'use client';
import styles from './navBar.module.css';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavBar() {
    const pathName = usePathname();

    return (
        <>
            {pathName !== '/workspaces' &&
                <div className={styles.navBar}>
                    <Link href="/main" className={styles.navButton}>
                        <div className={styles.buttonIcon}></div>
                    </Link>
                    <Link href="/chatting" className={styles.navButton}>
                        <div className={styles.buttonIcon}></div>
                    </Link>
                    <Link href="/dm" className={styles.navButton}>
                        <div className={styles.buttonIcon}></div>
                    </Link>
                    <Link href="/task" className={styles.navButton}>
                        <div className={styles.buttonIcon}></div>
                    </Link>
                </div>
            }
        </>
    )
};