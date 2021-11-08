import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import axios from '@util/axios'

export default function App (props) {
    
    return (<>
        <Default>
            <HomePage data={props}/>
        </Default>
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
            defaultEventImageURL: homePage.data.defaultEventImage.url,
            events: events.data
        },
        
    }
}