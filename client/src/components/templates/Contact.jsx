import styles from './Contact.module.sass'
import apiURL from '@config/connection'
import { useState } from 'react'

export default function Contact ({ contactInfo = [], bdeInfo = {} }) {
    const [formData, setFormData] = useState({
        name: '',
        mail: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [copiedItem, setCopiedItem] = useState(null)

    const handleCopy = async (text, itemName) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedItem(itemName)
            setTimeout(() => setCopiedItem(null), 2000)
        } catch (err) {
            console.error('Erreur lors de la copie:', err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch(`${apiURL}/api/contact-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: formData })
            })

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message envoyé avec succès !' })
                setFormData({ name: '', mail: '', subject: '', message: '' })
            } else {
                throw new Error('Erreur lors de l\'envoi')
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.contactContainer}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Contact</h1>
                <p className={styles.subtitle}>Une question ? N'hésitez pas à nous contacter</p>
            </div>

            <div className={styles.contactContent}>
                {/* Section Informations */}
                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>
                        <i className="fas fa-address-book"></i>
                        Nos coordonnées
                    </h2>

                    <div className={styles.bdeInfo}>
                        {bdeInfo.email && (
                            <div className={styles.infoItem}>
                                <i className="fas fa-envelope"></i>
                                <a href={`mailto:${bdeInfo.email}`}>{bdeInfo.email}</a>
                                <button
                                    className={`${styles.copyBtn} ${copiedItem === 'bde-email' ? styles.copied : ''}`}
                                    onClick={() => handleCopy(bdeInfo.email, 'bde-email')}
                                    title="Copier l'email"
                                >
                                    <i className={copiedItem === 'bde-email' ? 'fas fa-check' : 'fas fa-copy'}></i>
                                </button>
                            </div>
                        )}
                        {bdeInfo.phone && (
                            <div className={styles.infoItem}>
                                <i className="fas fa-phone"></i>
                                <span>{bdeInfo.phone}</span>
                                <button
                                    className={`${styles.copyBtn} ${copiedItem === 'bde-phone' ? styles.copied : ''}`}
                                    onClick={() => handleCopy(bdeInfo.phone, 'bde-phone')}
                                    title="Copier le téléphone"
                                >
                                    <i className={copiedItem === 'bde-phone' ? 'fas fa-check' : 'fas fa-copy'}></i>
                                </button>
                            </div>
                        )}
                        {bdeInfo.location && (
                            <div className={styles.infoItem}>
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{bdeInfo.location}</span>
                                <button
                                    className={`${styles.copyBtn} ${copiedItem === 'bde-location' ? styles.copied : ''}`}
                                    onClick={() => handleCopy(bdeInfo.location, 'bde-location')}
                                    title="Copier la localisation"
                                >
                                    <i className={copiedItem === 'bde-location' ? 'fas fa-check' : 'fas fa-copy'}></i>
                                </button>
                            </div>
                        )}
                        {bdeInfo.address && (
                            <div className={styles.infoItem}>
                                <i className="fas fa-building"></i>
                                <span>{bdeInfo.address}</span>
                                <button
                                    className={`${styles.copyBtn} ${copiedItem === 'bde-address' ? styles.copied : ''}`}
                                    onClick={() => handleCopy(bdeInfo.address, 'bde-address')}
                                    title="Copier l'adresse"
                                >
                                    <i className={copiedItem === 'bde-address' ? 'fas fa-check' : 'fas fa-copy'}></i>
                                </button>
                            </div>
                        )}
                    </div>

                    {contactInfo && contactInfo.length > 0 && (
                        <div className={styles.contactList}>
                            <h3 className={styles.sectionSubtitle}>Contacts spécifiques</h3>
                            {contactInfo.map((contact, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <span className={styles.contactName}>{contact.name}</span>
                                    <div className={styles.contactEmailWrapper}>
                                        <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
                                            {contact.email}
                                        </a>
                                        <button
                                            className={`${styles.copyBtn} ${copiedItem === `contact-${index}` ? styles.copied : ''}`}
                                            onClick={() => handleCopy(contact.email, `contact-${index}`)}
                                            title="Copier l'email"
                                        >
                                            <i className={copiedItem === `contact-${index}` ? 'fas fa-check' : 'fas fa-copy'}></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Section Formulaire */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>
                        <i className="fas fa-paper-plane"></i>
                        Envoyer un message
                    </h2>

                    <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Overlay de succès */}
                            {status.type === 'success' && (
                            <div className={styles.successOverlay}>
                                <div className={styles.successContent}>
                                    <i className="fas fa-check-circle"></i>
                                    <span>{status.message}</span>
                                    <button
                                        type="button"
                                        className={`${styles.newMessageBtn} circleHover`}
                                        onClick={() => setStatus({ type: '', message: '' })}
                                    >
                                        Envoyer un autre message
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Votre nom"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="mail">Email</label>
                            <input
                                type="email"
                                id="mail"
                                name="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                required
                                placeholder="Votre email"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="subject">Sujet</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Sujet du message"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Votre message..."
                                rows={5}
                            />
                        </div>

                        {status.type === 'error' && (
                            <div className={`${styles.status} ${styles.error}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`${styles.submitBtn} circleHover`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                            <i className="fas fa-paper-plane circleHover"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}