import Events from '@template/Events'
import Default from '@layout/Default'

import axios from '@util/axios'

export default function App ({ events, defaultEventImage }) {

    return (<>
        <Default>
            <Events events={events} defaultEventImageURL={defaultEventImage.url}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [homePage, events] = await Promise.all([
        axios('/home-page'),
        axios('/events?_sort=startDate:DESC')
    ])

    return {
        props: {
            defaultEventImage: homePage.data.defaultEventImage,
            events: events.data
        }
    }
}