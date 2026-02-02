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

    const [links, events] = await Promise.all([
        strapi.single('link').find(),
        strapi.collection('events').find({
            populate: ['image', 'tarifs', 'lieu', 'liens'],
            sort: 'startDate:DESC',
            pagination: { pageSize: 50 }
        })
    ])

    return {
        props: {
            links: links.data,
            events: events.data
        },
        revalidate: 20
    }
}