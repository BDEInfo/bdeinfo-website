import React, { useState } from 'react'
import useInterval from '@hook/useInterval'
import styles from './HomePage.module.sass'
import dateformat from 'dateformat'

export default function HomePage ({ data }) {

    const [radioChecked, setRadioChecked] = useState(1)

    useInterval(() => {

        if (radioChecked === 3) setRadioChecked(1)
        else setRadioChecked(radioChecked + 1)

    }, data.carouselDelayInSeconds * 1000)

    return (<>
        <div className={styles.mainText}>
            <h2 className={`${styles.preTitle} circleHover`}>
                { data.location }
            </h2>
            <h1 className={`${styles.title} circleHover`}>
                BDE <span className="circleHover">INFO</span>
            </h1>
            <h3 className={`${styles.postTitle} circleHover`}>
                { data.description }
            </h3>
        </div>

        <div className={styles.eventsContainer}>
            <input className={styles.radio} type="radio" name="slider" id={styles['radio-1']} defaultChecked={radioChecked === 1}/>
            <input className={styles.radio} type="radio" name="slider" id={styles['radio-2']} defaultChecked={radioChecked === 2}/>
            <input className={styles.radio} type="radio" name="slider" id={styles['radio-3']} defaultChecked={radioChecked === 3}/>

            <div className={styles.events}>
                {data.events.map((event, i) => 
                    <label className={styles.event} htmlFor={`item-${i+1}`} id={styles[`event-${i+1}`]} key={event.id}>
                        <img className={styles.eventImg} src={`${process.env.BASE_URL}${event.image.url}`}/>
                    </label>
                )}
            </div>

            <div className={styles.info}>
                <div className={styles.upperPart}>
                    <div className={styles.infoArea} id={styles.text}>
                        {data.events.map((event, i) => 
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

        <div className={styles.links}>
            <i className={`${styles.link} circleHover fab fa-instagram`}></i>
            <i className={`${styles.link} circleHover fab fa-facebook`}></i>
            <i className={`${styles.link} circleHover fas fa-link`}></i>
        </div>

        <div id="cursorCircle"></div>

    </>)

}

function formatDate (date) {

    return dateformat(new Date(date), 'dd/mm à HH:MM')
}