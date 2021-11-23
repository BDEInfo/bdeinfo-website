import Link from 'next/link'
import styles from './Header.module.sass'

import { tabs } from '@config/navbar'

export default function Header () {

    return (<>
        <nav className={styles.navbar}>
            <div className={styles.tabs}>
                {tabs.map(tab => 
                    <Link href={tab.route} key={tab.displayName}>
                        <a className={`${styles.tab} circleHover`}>{tab.displayName}</a>
                    </Link>
                )}
            </div>
        </nav>

        <div className={styles.links}>
            <i className={`${styles.link} circleHover fab fa-instagram`}></i>
            <i className={`${styles.link} circleHover fab fa-facebook`}></i>
            <i className={`${styles.link} circleHover fas fa-link`}></i>
        </div>

    </>)
}