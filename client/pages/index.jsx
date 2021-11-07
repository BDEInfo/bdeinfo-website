import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import axios from '@util/axios'
import Script from 'next/script'

export default function App (props) {
    
    return (<>
        <Default>
            <HomePage data={props}/>
        </Default>

        <Script 
            src="/scripts/circleCursor.js"
            strategy="afterInteractive"
        />
        <Script 
            src="https://kit.fontawesome.com/d055a26e11.js"
            strategy="beforeInteractive"
            crossOrigin="anonymous"
        />
    </>)
}

export async function getStaticProps () {

    const [homePage, events] = await Promise.all([
        axios('/home-page'),
        axios('/events?_sort=startDate:DESC&_limit=3')
    ])
    return {
        props: {
            location: homePage.data.location,
            description: homePage.data.description,
            carouselDelayInSeconds: homePage.data.carouselDelayInSeconds,
            events: events.data
        },
        
    }
}