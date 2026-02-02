import styles from './EventDetails.module.sass'

import { escapeNewLine, formatDate } from '@util/format'
import { getImage } from '@util/image'

export default function EventDetails ({ event }) {

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

    // Vérifier le statut de l'événement
    const now = new Date()
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : start
    const isOngoing = start <= now && end >= now
    const isPast = end < now
    const isUpcoming = start > now

    // Trouver le prix minimum
    const minPrice = event.tarifs && event.tarifs.length > 0
        ? Math.min(...event.tarifs.map(t => t.price))
        : null

    return (
        <div className={styles.eventDetails}>
            {/* Bannière image */}
            <div className={styles.banner}>
                <img
                    className={styles.bannerImage}
                    src={getImage(event.image, 'large')}
                    alt={event.title}
                />
                <div className={styles.bannerOverlay}>
                    {event.tags && (
                        <span className={styles.tag}>{tagLabels[event.tags] || event.tags}</span>
                    )}
                    {isUpcoming && (
                        <span className={`${styles.statusBadge} ${styles.upcoming}`}>
                            <i className="fas fa-clock"></i> À venir
                        </span>
                    )}
                    {isOngoing && (
                        <span className={`${styles.statusBadge} ${styles.ongoing}`}>
                            <i className="fas fa-circle"></i> En cours
                        </span>
                    )}
                    {isPast && (
                        <span className={`${styles.statusBadge} ${styles.past}`}>
                            Terminé
                        </span>
                    )}
                </div>
            </div>

            {/* Infos principales */}
            <div className={styles.mainInfo}>
                <div className={styles.infoCard}>
                    <i className="fas fa-calendar-alt"></i>
                    <div>
                        <span className={styles.infoLabel}>Date</span>
                        <span className={styles.infoValue}>
                            {formatDate(event.startDate)}
                            {event.endDate && ` → ${formatDate(event.endDate)}`}
                        </span>
                    </div>
                </div>

                {event.lieu && (
                    <div className={styles.infoCard}>
                        <i className={event.lieu.distanciel ? "fas fa-video" : "fas fa-map-marker-alt"}></i>
                        <div>
                            <span className={styles.infoLabel}>Lieu</span>
                            <span className={styles.infoValue}>
                                {event.lieu.distanciel ? 'En ligne' : event.lieu.lieu}
                            </span>
                        </div>
                    </div>
                )}

                {minPrice !== null && (
                    <div className={styles.infoCard}>
                        <i className="fas fa-ticket-alt"></i>
                        <div>
                            <span className={styles.infoLabel}>Prix</span>
                            <span className={styles.infoValue}>
                                {minPrice === 0 ? 'Gratuit' : `À partir de ${minPrice}€`}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            {event.description && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                        <i className="fas fa-align-left"></i> À propos
                    </h3>
                    <div className={styles.description}>
                        {escapeNewLine(event.description)}
                    </div>
                </div>
            )}

            {/* Tarifs détaillés */}
            {event.tarifs && event.tarifs.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                        <i className="fas fa-tags"></i> Tarifs
                    </h3>
                    <div className={styles.tarifs}>
                        {event.tarifs.map((tarif, index) => (
                            <div key={index} className={styles.tarif}>
                                <div className={styles.tarifHeader}>
                                    <span className={styles.tarifName}>{tarif.name}</span>
                                    <span className={styles.tarifPrice}>
                                        {tarif.price === 0 ? 'Gratuit' : `${tarif.price}€`}
                                    </span>
                                </div>
                                {tarif.description && (
                                    <p className={styles.tarifDescription}>{tarif.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Liens / Actions */}
            {event.liens && event.liens.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                        <i className="fas fa-link"></i> Liens
                    </h3>
                    <div className={styles.liens}>
                        {event.liens.map((lien, index) => (
                            <a
                                key={index}
                                href={lien.url}
                                target={lien.open_new_page ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={styles.lien}
                            >
                                <i className={lien.font_awesome_class_name || "fas fa-external-link-alt"}></i>
                                <span>{lien.title || lien.url}</span>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
