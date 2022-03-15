import Events from '@template/Events'
import Default from '@layout/Default'

import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

export default function App ({ links, events, defaultEventImage }) {

    return (<>
        <Default links={links}>
            <Events events={events} defaultEventImage={defaultEventImage}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [links, homePage, events] = await Promise.all([
        axios('/link'),
        axios('/home-page'),
        axios('/events', {
            params: {
                'sort': 'startDate:DESC'
            }
        })
    ])

    return {
        props: {
            links: formatJSONResponse(links.data),
            defaultEventImage: formatJSONResponse(homePage.data.data.attributes.defaultEventImage),
            events: formatJSONResponse(events.data)
        },
        revalidate: 20
    }
}