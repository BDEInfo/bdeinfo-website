import styles from './Events.module.sass'
import EventCard from '@module/EventCard/EventCard'
import Modal from '@layout/Modal'
import EventDetails from '@module/EventCard/EventDetails'

import { useState } from 'react'

export default function Events ({ events }) {

    const [selectedEvent, setSelectedEvent] = useState(null)

    const handleEventClick = (event) => {
        setSelectedEvent(event)
    }

    const handleCloseModal = () => {
        setSelectedEvent(null)
    }

    // Séparer les événements en cours/à venir et passés
    const now = new Date()

    // Fonction pour vérifier si un événement est en cours
    const isEventOngoing = (e) => {
        const start = new Date(e.startDate)
        const end = e.endDate ? new Date(e.endDate) : start
        return start <= now && end >= now
    }

    // Actifs : en cours ou à venir (triés avec en cours en premier)
    const activeEvents = events
        .filter(e => {
            const end = e.endDate ? new Date(e.endDate) : new Date(e.startDate)
            return end >= now
        })
        .sort((a, b) => {
            // En cours en premier
            const aOngoing = isEventOngoing(a)
            const bOngoing = isEventOngoing(b)
            if (aOngoing && !bOngoing) return -1
            if (!aOngoing && bOngoing) return 1
            // Puis par date de début
            return new Date(a.startDate) - new Date(b.startDate)
        })

    // Passés : déjà terminé
    const pastEvents = events.filter(e => {
        const end = e.endDate ? new Date(e.endDate) : new Date(e.startDate)
        return end < now
    })

    return (<>
        <div className={styles.eventsContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Événements</h1>
                <p className={styles.subtitle}>Découvrez tous les événements organisés par le BDE Info</p>
            </header>

            {activeEvents.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <i className="fas fa-calendar-alt"></i>
                        À venir
                        <span className={styles.count}>{activeEvents.length}</span>
                    </h2>
                    <div className={styles.eventsGrid}>
                        {activeEvents.map(event =>
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => handleEventClick(event)}
                                isOngoing={isEventOngoing(event)}
                            />
                        )}
                    </div>
                </section>
            )}

            {pastEvents.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <i className="fas fa-history"></i>
                        Événements passés
                        <span className={styles.count}>{pastEvents.length}</span>
                    </h2>
                    <div className={styles.eventsGrid}>
                        {pastEvents.map(event =>
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => handleEventClick(event)}
                                isPast
                            />
                        )}
                    </div>
                </section>
            )}

            {events.length === 0 && (
                <div className={styles.empty}>
                    <i className="fas fa-calendar-times"></i>
                    <p>Aucun événement pour le moment</p>
                </div>
            )}
        </div>

        <Modal
            show={selectedEvent !== null}
            onClose={handleCloseModal}
            title={selectedEvent?.title || ''}
        >
            {selectedEvent && <EventDetails event={selectedEvent} />}
        </Modal>
    </>)
}