import styles from './Header.module.sass'

const tabs = [
    { displayedName: 'Accueil' },
    { displayedName: 'À propos' },
    { displayedName: 'Events' },
    { displayedName: 'Utilitaires' },
    { displayedName: 'Contact' },
]

export default function Header () {

    return (<>
        <nav className={styles.navbar}>
            <ul className={styles.tabs}>
                {tabs.map(tab =>
                    <li className={`${styles.tab} circleHover`} key={tab.displayedName}>{tab.displayedName}</li>
                )}
            </ul>
        </nav>

        <div className={styles.links}>
            <i className={`${styles.link} circleHover fab fa-instagram`}></i>
            <i className={`${styles.link} circleHover fab fa-facebook`}></i>
            <i className={`${styles.link} circleHover fas fa-link`}></i>
        </div>

    </>)
}