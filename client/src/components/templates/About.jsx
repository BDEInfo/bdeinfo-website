import styles from './About.module.sass'
import ModalCustomTitle from '@layout/ModalCustomTitle'
import Adherents from '@module/Adherents/Adherents'
import BDEMembers from '@module/BDEMembers/BDEMembers'
import MandatDropdown from '@module/MandatDropdown/MandatDropdown'

import { getImage } from '@util/image'
import { publicURL } from '@config/connection'

import { useState, useEffect, useMemo } from 'react'

const isFontAwesomeClass = (value) => typeof value === 'string' && value.trim().includes('fa-')

export default function About ({ bdeInformations, bdeMembers, adherents, adherentsConfig, mandats }) {

    const [membersModal, setMembersModal] = useState(false)
    const [adherentsModal, setAdherentsModal] = useState(false)
    const [selectedMandat, setSelectedMandat] = useState(null)

    // Vérifier si les adhérents sont activés
    const adherentsEnabled = adherentsConfig?.type !== 'none'

    // Initialiser le mandat sélectionné avec le mandat actuel du BDE
    useEffect(() => {
        if (!selectedMandat && mandats && mandats.length > 0) {
            const mandatActuel = bdeInformations?.mandat_actuel
            if (mandatActuel) {
                const found = mandats.find(m => m.id === mandatActuel.id)
                setSelectedMandat(found || mandats[0])
            } else {
                setSelectedMandat(mandats[0])
            }
        }
    }, [mandats, bdeInformations, selectedMandat])

    // Filtrer les membres par mandat sélectionné
    const filteredMembers = selectedMandat
        ? bdeMembers.filter(member => member.mandat?.id === selectedMandat.id)
        : bdeMembers

    const mandatLabel = selectedMandat?.annee || bdeInformations?.mandat_actuel?.annee

    const cards = useMemo(() => bdeInformations?.cards || [], [bdeInformations])
    const descriptionShort = bdeInformations?.description_short || ''
    const statutsUrl = bdeInformations?.statuts?.url

    const logoValue = bdeInformations?.logo
    const logoIsIcon = isFontAwesomeClass(logoValue)

    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.logoWrap}>
                        {logoIsIcon
                            ? <div className={styles.logoIcon} aria-hidden={true}><i className={logoValue}></i></div>
                            : <img className={styles.logo} src={getImage(logoValue, 'thumbnail')} alt="Logo BDE Info" />
                        }
                        {mandatLabel && <span className={styles.mandatChip}>Mandat {mandatLabel}</span>}
                    </div>
                    <h1 className={styles.title}>BDE Info</h1>
                    <div className={styles.lead} dangerouslySetInnerHTML={{ __html: descriptionShort }} />
                    <div className={styles.actions}>
                        <button className={styles.primaryAction} onClick={() => setMembersModal(true)}>
                            Découvrir l'équipe
                        </button>
                        <button className={styles.secondaryAction} onClick={() => setAdherentsModal(true)}>
                            Voir les adhérents
                        </button>
                        {statutsUrl && (
                            <a className={styles.ghostAction} href={`${publicURL}${statutsUrl}`} target="_blank" rel="noreferrer">
                                Statuts du BDE
                            </a>
                        )}
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.visualCard}>
                        <img className={styles.image} src={getImage(bdeInformations.image, 'large')} alt="Illustration BDE" />
                    </div>
                </div>
            </section>

            {cards.length > 0 && (
                <section className={styles.blocks}>
                    {cards.map(card => (
                        <div key={card.id || card.title} className={styles.blockCard}>
                            <div className={styles.blockHeader}>
                                {card.icon && <span className={styles.blockIcon}><i className={card.icon}></i></span>}
                                <div className={styles.blockTitle}>{card.title}</div>
                            </div>
                            <div className={styles.blockText} dangerouslySetInnerHTML={{ __html: card.content }} />
                        </div>
                    ))}
                </section>
            )}

            <ModalCustomTitle
                onClose={() => setMembersModal(false)}
                show={membersModal}
                title="Membres du Bureau"
                titleComponent={
                    <MandatDropdown
                        mandats={mandats}
                        selectedMandat={selectedMandat}
                        onMandatChange={setSelectedMandat}
                        mandatActuelId={bdeInformations?.mandat_actuel?.id}
                    />
                }
            >
                <BDEMembers bdeMembers={filteredMembers}/>
            </ModalCustomTitle>

            {adherentsEnabled && (
                <ModalCustomTitle
                    onClose={() => setAdherentsModal(false)}
                    show={adherentsModal}
                    title="Adhérents"
                    titleComponent={
                        <MandatDropdown
                            mandats={mandats}
                            selectedMandat={selectedMandat}
                            onMandatChange={setSelectedMandat}
                            mandatActuelId={bdeInformations?.mandat_actuel?.id}
                        />
                    }
                >
                    <Adherents adherents={adherents}/>
                </ModalCustomTitle>
            )}
        </div>
    )
}