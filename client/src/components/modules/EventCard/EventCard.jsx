import styles from './EventCard.module.sass'

import { formatDate } from '@util/format'
import { getImage } from '@util/image'

export default function EventCard ({ event, onClick, isPast, isOngoing }) {

    // Trouver le prix minimum pour l'affichage
    const minPrice = event.tarifs && event.tarifs.length > 0
        ? Math.min(...event.tarifs.map(t => t.price))
        : null

    // Formater le tag pour l'affichage
    const tagLabels = {
        'integration': 'Intégration',
        'soiree': 'Soirée',
        'concours': 'Concours',
        'tournois': 'Tournois',
        'culture': 'Culture',
        'event': 'Événement',
        'afterwork': 'Afterwork'
    }

    const cardClasses = [
        styles.eventCard,
        isPast && styles.past,
        isOngoing && styles.ongoing
    ].filter(Boolean).join(' ')

    return (
        <div className={cardClasses} onClick={onClick}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={getImage(event.image, 'medium')} alt={event.title} />
                {event.tags && (
                    <span className={styles.tag}>{tagLabels[event.tags] || event.tags}</span>
                )}
                {isPast && <div className={styles.pastOverlay}>Terminé</div>}
                {isOngoing && <div className={styles.ongoingBadge}><i className="fas fa-circle"></i> En cours</div>}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{event.title}</h3>

                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <i className="fas fa-calendar-alt"></i>
                        <span>{formatDate(event.startDate)}</span>
                        {event.endDate && (
                            <>
                                <span className={styles.separator}>→</span>
                                <span>{formatDate(event.endDate)}</span>
                            </>
                        )}
                    </div>

                    {event.lieu && (
                        <div className={styles.metaItem}>
                            <i className={event.lieu.distanciel ? "fas fa-video" : "fas fa-map-marker-alt"}></i>
                            <span>{event.lieu.distanciel ? 'En ligne' : event.lieu.lieu}</span>
                        </div>
                    )}
                </div>

                {event.description && (
                    <p className={styles.description}>
                        {event.description.length > 100
                            ? event.description.substring(0, 100) + '...'
                            : event.description}
                    </p>
                )}

                <div className={styles.footer}>
                    {minPrice !== null ? (
                        <span className={styles.price}>
                            {minPrice === 0 ? 'Gratuit' : `À partir de ${minPrice}€`}
                        </span>
                    ) : (
                        <span></span>
                    )}
                    <span className={styles.cta}>
                        Voir plus <i className="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}