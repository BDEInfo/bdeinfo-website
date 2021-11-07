import styles from './Header.module.sass'

const tabs = [
    { displayedName: 'Accueil' },
    { displayedName: 'À propos' },
    { displayedName: 'Events' },
    { displayedName: 'Utilitaires' },
    { displayedName: 'Contact' },
]
export default function Header () {

    return (
        <nav className={styles.navbar}>
            <ul className={styles.tabs}>
                {tabs.map(tab =>
                    <li className={`${styles.tab} circleHover`} key={tab.displayedName}>{tab.displayedName}</li>
                )}
            </ul>
        </nav>
    )
}