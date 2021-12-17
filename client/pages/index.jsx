import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

export default function App ({ links, homePage, events }) {
    
    return (<>
        <Default links={links}>
            <HomePage homePage={homePage} events={events}/>
        </Default>
    </>)
}

export async function getServerSideProps (ctx) {

    const [links, homePage, events] = await Promise.all([
        axios('/link'),
        axios('/home-page'),
        axios('/events', {
            params: {
                'sort': 'startDate:DESC',
                'pagination[limit]': 3 
            }
        })
    ])

    return {
        props: {
            links: formatJSONResponse(links.data),
            homePage: formatJSONResponse(homePage.data),
            events: formatJSONResponse(events.data)
        }
    }
}