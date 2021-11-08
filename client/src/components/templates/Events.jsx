import styles from './Events.module.sass'
import apiURL from '@config/connection'

import formatDate from '@util/formatDate'
import { escapeNewLine } from '@util/formatText'

export default function Events ({ events, defaultEventImageURL }) {

    return (<div className={styles.eventsContainer}>

        <div className={styles.events}>
            {events.concat(events).map((event, i) => 
                <div className={styles.event} key={event.id}>
                    <img className={styles.image} src={`${apiURL}${event.image?.url || defaultEventImageURL}`}/>
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
            )}
        </div>

    </div>)
}