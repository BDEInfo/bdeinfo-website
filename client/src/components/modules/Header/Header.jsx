import Link from 'next/link'
import styles from './Header.module.sass'

import { tabs } from '@config/navbar'

export default function Header ({ links }) {

    return (<>
        <nav className={styles.navbar}>
            <div className={styles.tabs}>
                {tabs.filter(tab => !tab?.disabled).map(tab => 
                    <Link href={tab.route} key={tab.displayName}>
                        <a className={`${styles.tab} circleHover`}>{tab.displayName}</a>
                    </Link>
                )}
            </div>
        </nav>

        <div className={styles.links}>
            <a href={links.instagram}><i className={`${styles.link} circleHover fab fa-instagram`}></i></a>
            <a href={links.facebook}><i className={`${styles.link} circleHover fab fa-facebook`}></i></a>
            <a href={links.linktree}><i className={`${styles.link} circleHover fas fa-link`}></i></a>
        </div>

    </>)
}