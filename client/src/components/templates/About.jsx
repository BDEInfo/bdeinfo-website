import styles from './About.module.sass'
import Modal from '@layout/Modal'
import ModalCustomTitle from '@layout/ModalCustomTitle'
import Adherents from '@module/Adherents/Adherents'
import BDEMembers from '@module/BDEMembers/BDEMembers'
import MandatDropdown from '@module/MandatDropdown/MandatDropdown'

import { getImage } from '@util/image'
import apiURL from '@config/connection'
import useWindowDimensions from '@hook/useWindowDimensions'

import Tilt from 'react-tilt'
import { useState, useEffect } from 'react'

export default function About ({ bdeInformations, bdeMembers, adherents, mandats }) {

    const [membersModal, setMembersModal] = useState(false)
    const [adherentsModal, setAdherentsModal] = useState(false)
    const [selectedMandat, setSelectedMandat] = useState(null)
    const [ width, height ] = useWindowDimensions()

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
    }, [mandats, bdeInformations])

    // Filtrer les membres par mandat sélectionné
    const filteredMembers = selectedMandat
        ? bdeMembers.filter(member => member.mandat?.id === selectedMandat.id)
        : bdeMembers

    return (<>

        <div className={styles.aboutContainer}>
            { width > 768 ? 
            
                <Tilt 
                    className={styles.tilt}
                    options={{
                        max: 10,
                        reverse: true,
                        perspective: 600,
                        scale: 1.1,
                        easing: "cubic-bezier(.1,.98,.52,.99)"
                    }}
                    >

                    <div className={styles.informationsContainer}>
                        <div className={styles.informations}>
                                <img className={styles.logo} src={getImage(bdeInformations.logo, 'thumbnail')}/>
                                <div className={styles.subInformations}>
                                    <div className={styles.email}>{bdeInformations.email}</div>
                                    <div className={styles.phone}>{bdeInformations.phone}</div>
                                    <div className={styles.location}>{bdeInformations.location}</div>
                                </div>
                                <div className={styles.description}>{bdeInformations.description}</div>

                        </div>
                        <img className={styles.image} src={getImage(bdeInformations.image, 'large')}/>
                    </div>

                </Tilt>
            
                :

                <div className={styles.informationsContainer}>
                    <div className={styles.informations}>
                            <img className={styles.logo} src={getImage(bdeInformations.logo, 'thumbnail')}/>
                            <div className={styles.subInformations}>
                                <div className={styles.email}>{bdeInformations.email}</div>
                                <div className={styles.phone}>{bdeInformations.phone}</div>
                                <div className={styles.location}>{bdeInformations.location}</div>
                            </div>
                            <div className={styles.description}>{bdeInformations.description}</div>

                    </div>
                    <img className={styles.image} src={getImage(bdeInformations.image, 'large')}/>
                </div>

            
            
            }
            

            <div className={styles.separator} />

            <div className={styles.interactions}>
                <a className={`${styles.members} circleHover`} onClick={() => setMembersModal(true)}>
                    <div className={`${styles.text} circleHover`}>Membres <i className="circleHover fas fa-users"></i></div>
                </a>
                <a className={`${styles.status} circleHover`} href={`${apiURL}${bdeInformations.statuts.url}`} target="_blank">
                    <div className={`${styles.text} circleHover`}>Statuts <i className="circleHover fas fa-book"></i></div>
                </a>
                <a className={`${styles.adherents} circleHover`} onClick={() => setAdherentsModal(true)}>
                    <div className={`${styles.text} circleHover`}>Adhérents <i className="circleHover fas fa-users"></i></div>
                </a>
            </div>

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



        </div>

        
    </>)
}