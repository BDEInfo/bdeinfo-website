import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styles from './Modal.module.sass'

export default function Modal ({ show, onClose, children, title, titleComponent }) {

    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    // lock body scroll when modal is open (simplified)
    useEffect(() => {
        if (!isBrowser) return
        const originalOverflow = document.body.style.overflow
        const originalPosition = document.body.style.position
        const originalTop = document.body.style.top
        let scrollY = 0
        if (show) {
            scrollY = window.scrollY
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
        } else {
            const storedTop = document.body.style.top
            document.body.style.overflow = originalOverflow
            document.body.style.position = originalPosition
            document.body.style.top = originalTop
            if (storedTop) {
                const y = parseInt(storedTop, 10) || 0
                window.scrollTo(0, -y)
            }
        }
        return () => {
            const storedTop = document.body.style.top
            document.body.style.overflow = originalOverflow
            document.body.style.position = originalPosition
            document.body.style.top = originalTop
            if (storedTop) {
                const y = parseInt(storedTop, 10) || 0
                window.scrollTo(0, -y)
            }
        }
    }, [show, isBrowser])

    const handleCloseClick = (e) => {
        e.preventDefault()
        onClose()
    }

    const modalContent = show ? (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    { title && <div className={styles.modalTitle}>{title}</div>}
                    <i onClick={handleCloseClick} className={"fas fa-times"} aria-label={"close"}></i>
                </div>
                {titleComponent && (
                    <div className={styles.titleComponent}>
                        {titleComponent}
                    </div>
                )}
                <div className={styles.separator} />
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    ) : null

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        )
    } else return null

}