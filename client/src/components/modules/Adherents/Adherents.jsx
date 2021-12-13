import styles from './Adherents.module.sass'

export default function Adherents ({ adherents }) {

    return (<>
        <div className={styles.count}>Total : <span>{ adherents.length }</span></div>
        <ul className={styles.adherents}>
        { adherents.map(adherent => 
            <li className={styles.adherent}>
                {adherent.firstName} <span>{adherent.lastName}</span>
            </li>
        )}
        </ul>

    </>)
}