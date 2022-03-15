import styles from './Events.module.sass'
import EventCard from '@module/EventCard/EventCard'

export default function Events ({ events }) {

    return (<>
    
        <div className={styles.eventsContainer}>
            <div className={styles.events}>
                {events.map(event => 
                    <EventCard event={event} />
                )}
            </div>
        </div>
    </>)
}