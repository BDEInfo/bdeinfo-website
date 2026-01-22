import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styles from './ModalCustomTitle.module.sass'

export default function ModalCustomTitle ({ show, onClose, title, titleComponent, children }) {

    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    const handleCloseClick = (e) => {
        e.preventDefault()
        onClose()
    }

    const modalContent = show ? (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <span className={styles.title}>{title}</span>
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
