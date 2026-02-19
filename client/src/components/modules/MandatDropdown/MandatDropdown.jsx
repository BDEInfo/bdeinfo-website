import { useState } from 'react'
import styles from './MandatDropdown.module.sass'
import { getImage } from '@util/image'

export default function MandatDropdown ({ mandats, selectedMandat, onMandatChange, mandatActuelId }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleMandatSelect = (mandat) => {
        onMandatChange(mandat)
        setDropdownOpen(false)
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const isActuel = (mandat) => mandat?.id === mandatActuelId

    return (
        <div className={styles.dropdownWrapper}>
            <div className={styles.dropdownContainer}>
                <div className={styles.dropdownTrigger} onClick={toggleDropdown}>
                    {selectedMandat && (
                        <>
                            <img
                                className={styles.mandatLogo}
                                src={getImage(selectedMandat.logo, 'thumbnail')}
                                alt={selectedMandat.nom}
                            />
                            <span className={styles.mandatName}>{selectedMandat.nom}</span>
                            <span className={styles.mandatYear}>{selectedMandat.annee}</span>
                            {isActuel(selectedMandat) && <span className={styles.badgeActuel}>Actuel</span>}
                        </>
                    )}
                    <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'} ${styles.dropdownIcon}`}></i>
                </div>
                {dropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        {mandats.map((mandat) => (
                            <div
                                key={mandat.id}
                                className={`${styles.dropdownItem} ${selectedMandat?.id === mandat.id ? styles.active : ''}`}
                                onClick={() => handleMandatSelect(mandat)}
                            >
                                <img
                                    className={styles.mandatLogo}
                                    src={getImage(mandat.logo, 'thumbnail')}
                                    alt={mandat.nom}
                                />
                                <span className={styles.mandatName}>{mandat.nom}</span>
                                <span className={styles.mandatYear}>{mandat.annee}</span>
                                {isActuel(mandat) && <span className={styles.badgeActuel}>Actuel</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
