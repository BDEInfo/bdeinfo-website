import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styles from './Modal.module.sass'

export default function Modal ({ show, onClose, children, title }) {

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
                    { title && <div className={styles.modalTitle}>{title}</div>}
                    <i onClick={handleCloseClick} class="fas fa-times"></i>
                </div>
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