import styles from './Adherents.module.sass'
import { trollUrls } from '@config/trollUrls'

export default function Adherents ({ adherents }) {

    return (<>
        <div className={styles.count}>Total : <span>{ adherents.length }</span></div>
        <ul className={styles.adherents}>
        { adherents.map(adherent => 
            <a href={trollUrls[Math.floor(Math.random() * trollUrls.length)]}>
                <li className={styles.adherent}>
                    {adherent.firstName} <span>{adherent.lastName}</span>
                </li>
            </a>
        )}
        </ul>

    </>)
}