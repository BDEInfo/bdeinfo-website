import Events from '@template/Events'
import Default from '@layout/Default'

import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

export default function App ({ links, events }) {

    return (<>
        <Default links={links}>
            <Events events={events}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [links, events] = await Promise.all([
        axios('/link'),
        axios('/events', {
            params: {
                'sort': 'startDate:DESC',
                'pagination[pageSize]': 51
            }
        })
    ])

    return {
        props: {
            links: formatJSONResponse(links.data),
            events: formatJSONResponse(events.data)
        },
        revalidate: 20
    }
}