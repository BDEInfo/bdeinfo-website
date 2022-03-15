import styles from './EventCard.module.sass'

import { escapeNewLine, formatDate } from '@util/format'
import { getImage } from '@util/image'

export default function EventCard ({ event }) {

    return (
        <div key={event.id} className={styles.event}>
            <img className={styles.image} src={getImage(event.image, 'small')}/>
            <div className={styles.infos}>
                <h2 className={styles.title}>
                    {event.title}
                </h2>
                <h3 className={styles.date}>
                    {`${formatDate(event.startDate)}${event.endDate ? ` - ${formatDate(event.endDate)}` : ''}`}
                </h3>
                <p className={styles.price}>
                    {`${event.prixAdh}€ (Adhérents)`} / <span>{`${event.prixNAdh}€ (Non Adhérents)`}</span>
                </p>
                <div className={styles.descriptionContainer}>
                    <p className={styles.description}>
                        {escapeNewLine(event.description)}
                    </p>
                </div>
            </div>
        </div>
    )
}