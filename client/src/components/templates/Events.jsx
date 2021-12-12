import styles from './Events.module.sass'
import EventCard from '@module/EventCard/EventCard'

export default function Events ({ events, defaultEventImage }) {

    return (<>
    
        <div className={styles.eventsContainer}>
            <div className={styles.events}>
                {events.map(event => 
                    <EventCard event={event} defaultEventImage={defaultEventImage} />
                )}
            </div>
        </div>
    </>)
}