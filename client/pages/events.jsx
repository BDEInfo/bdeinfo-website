import Events from '@template/Events'
import Default from '@layout/Default'

import strapi from '@util/strapi'

export default function App ({ links, events }) {

    return (<>
        <Default links={links}>
            <Events events={events}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [linksResult, eventsResult] = await Promise.allSettled([
        strapi.single('link').find(),
        strapi.collection('events').find({
            populate: ['image', 'tarifs', 'lieu', 'liens'],
            sort: 'startDate:DESC',
            pagination: { pageSize: 50 }
        })
    ])

    const links = linksResult.status === 'fulfilled' ? linksResult.value.data : {}
    const events = eventsResult.status === 'fulfilled' ? eventsResult.value.data : []

    return {
        props: {
            links,
            events
        },
        revalidate: 120
    }
}