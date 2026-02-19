import Link from 'next/link'
import styles from './Header.module.sass'

import { tabs } from '@config/navbar'

export default function Header ({ links }) {

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.tabs}>
                    {tabs.filter(tab => !tab?.disabled).map(tab => 
                        <Link
                            href={tab.route}
                            key={tab.displayName}
                            className={`${styles.tab} circleHover`}>
                            {tab.displayName}
                        </Link>
                    )}
                </div>
            </nav>
            <div className={styles.links}>
                <a href={links.instagram} aria-label={"Notre Instagram"}><i aria-hidden={true} className={`${styles.link} circleHover fab fa-instagram`}></i></a>
                <a href={links.facebook} aria-label={"Notre Facebook"}><i aria-hidden={true} className={`${styles.link} circleHover fab fa-facebook`}></i></a>
                <a href={links.linktree} aria-label={"Notre Linktree"}><i aria-hidden={true} className={`${styles.link} circleHover fas fa-link`}></i></a>
            </div>
        </>
    );
}