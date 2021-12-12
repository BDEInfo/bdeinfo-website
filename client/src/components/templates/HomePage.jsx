import React, { useState } from 'react'
import styles from './HomePage.module.sass'

import useInterval from '@hook/useInterval'

import formatDate from '@util/formatDate'
import getImage from '@util/getImage'

export default function HomePage ({ homePage, events }) {

    const [radioChecked, setRadioChecked] = useState(1)

    useInterval(() => {

        if (radioChecked === 3) setRadioChecked(1)
        else setRadioChecked(radioChecked + 1)

    }, homePage.carouselDelayInSeconds * 1000)

    return (<>
        <div className={styles.mainText}>
            <h2 className={`${styles.preTitle} circleHover`}>
                { homePage.location }
            </h2>
            <h1 className={`${styles.title} circleHover`}>
                BDE <span className="circleHover">INFO</span>
            </h1>
            <h3 className={`${styles.postTitle} circleHover`}>
                { homePage.description }
            </h3>
        </div>

        <div className={styles.eventsContainer}>
            <input className={styles.radio} type="radio" name="slider" id={styles['radio-1']} defaultChecked={radioChecked === 1}/>
            <input className={styles.radio} type="radio" name="slider" id={styles['radio-2']} defaultChecked={radioChecked === 2}/>
            <input className={styles.radio} type="radio" name="slider" id={styles['radio-3']} defaultChecked={radioChecked === 3}/>

            <div className={styles.events}>
                {events.map((event, i) => 
                    <label className={styles.event} htmlFor={`item-${i+1}`} id={styles[`event-${i+1}`]} key={event.id}>
                        <img className={styles.eventImg} src={getImage(event.image, 'medium', homePage.defaultEventImage)}/>
                    </label>
                )}
            </div>

            <div className={styles.info}>
                <div className={styles.upperPart}>
                    <div className={styles.infoArea} id={styles.text}>
                        {events.map((event, i) => 
                            <label className={styles.eventInfo} id={`event-info-${i+1}`} htmlFor={`item-${i+1}`} key={event.id}>
                                <div className={styles.title}> { event.title } </div>
                                <div className={styles.subLine}>
                                    <div className={styles.miscInfo}>
                                        {`${formatDate(event.startDate)}${event.endDate ? ` - ${formatDate(event.endDate)}`:''}`}
                                    </div>
                                </div>
                            </label>
                        )}
                    </div>
                </div>
            </div>

        </div>
    </>)

}