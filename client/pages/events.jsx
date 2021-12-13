import Events from '@template/Events'
import Default from '@layout/Default'

import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

export default function App ({ events, defaultEventImage }) {

    return (<>
        <Default>
            <Events events={events} defaultEventImage={defaultEventImage}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [homePage, events] = await Promise.all([
        axios('/home-page'),
        axios('/events', {
            params: {
                'sort': 'startDate:DESC'
            }
        })
    ])

    return {
        props: {
            defaultEventImage: formatJSONResponse(homePage.data.data.attributes.defaultEventImage),
            events: formatJSONResponse(events.data)
        }
    }
}