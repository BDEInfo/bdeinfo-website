import styles from './Adherents.module.sass'
import { trollUrls } from '@config/trollUrls'

export default function Adherents ({ adherents }) {

    if (!adherents || adherents.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p className={styles.emptyMessage}>
                    <i className="fas fa-info-circle"></i>
                    Aucun adhérent pour ce mandat.
                </p>
            </div>
        )
    }

    return (<>
        <div className={styles.count}>Total : <span>{ adherents.length }</span></div>
        <ul className={styles.adherents}>
        { adherents.map((adherent, index) => {
            // Utiliser le lien de l'adhérent s'il existe, sinon un troll URL déterministe (évite les erreurs d'hydratation)
            const link = adherent.link || trollUrls[index % trollUrls.length]

            return (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                    <li className={styles.adherent}>
                        {adherent.firstName} <span>{adherent.lastName[0]}.</span>
                    </li>
                </a>
            )
        })}
        </ul>

    </>)
}


