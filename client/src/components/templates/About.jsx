import styles from './About.module.sass'

import getImage from '@util/getImage'
import apiURL from '@config/connection'

import Tilt from 'react-tilt'
import Link from 'next/link'

export default function About ({ bdeInformations }) {

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
                <a className={`${styles.adherents} circleHover`} href="/adherents">
                    <div className={styles.text}>Adhérents <i className="circleHover fas fa-users"></i></div>
                </a>
            </div>

        </div>
    </>)
}