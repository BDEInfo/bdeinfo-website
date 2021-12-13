import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

export default function App ({ homePage, events }) {
    
    return (<>
        <Default>
            <HomePage homePage={homePage} events={events}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [homePage, events] = await Promise.all([
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
            homePage: formatJSONResponse(homePage.data),
            events: formatJSONResponse(events.data)
        }
    }
}