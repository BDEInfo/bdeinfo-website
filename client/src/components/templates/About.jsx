import styles from './About.module.sass'
import Modal from '@layout/Modal'
import Adherents from '@module/Adherents/Adherents'

import { getImage } from '@util/image'
import apiURL from '@config/connection'

import Tilt from 'react-tilt'
import { useState } from 'react'

export default function About ({ bdeInformations, bdeMembers, adherents }) {

    const [showModal, setShowModal] = useState(false)

    return (<>

        <div className={styles.aboutContainer}>
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
                <div className={styles.informations}>
                    <img className={styles.logo} src={getImage(bdeInformations.logo, 'thumbnail')}/>
                    <div className={styles.subInformations}>
                        <div className={styles.email}>{bdeInformations.email}</div>
                        <div className={styles.phone}>{bdeInformations.phone}</div>
                        <div className={styles.location}>{bdeInformations.location}</div>
                    </div>
                    <div className={styles.description}>{bdeInformations.description}</div>

                </div>
                <div className={styles.mandat}>{bdeInformations.mandat}</div>
                <img className={styles.image} src={getImage(bdeInformations.image, 'large')}/>

            </Tilt>

            <div className={styles.separator} />

            <div className={styles.interactions}>
                <a className={`${styles.status} circleHover`} href={`${apiURL}${bdeInformations.statuts.url}`} target="_blank">
                    <div className={styles.text}>Statuts <i className="circleHover fas fa-book"></i></div>
                </a>
                <a className={`${styles.adherents} circleHover`} onClick={() => setShowModal(true)}>
                    <div className={styles.text}>Adhérents <i className="circleHover fas fa-users"></i></div>
                </a>
            </div>


            <Modal onClose={() => setShowModal(false)} show={showModal} title={`Adhérents ${bdeInformations.mandat}`}>
                <Adherents adherents={adherents}/>
            </Modal>

        </div>

        
    </>)
}