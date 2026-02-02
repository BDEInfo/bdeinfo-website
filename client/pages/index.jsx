import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import strapi from '@util/strapi'

export default function App ({ links, homePage, events }) {
    
    return (<>
        <Default links={links}>
            <HomePage homePage={homePage} events={events}/>
        </Default>
    </>)
}

export async function getServerSideProps (ctx) {

    const [links, homePage, events] = await Promise.all([
        strapi.single('link').find(),
        strapi.single('home-page').find(),
        strapi.collection('events').find({
            sort: 'startDate:DESC',
            pagination: { limit: 3 }
        })
    ])

    return {
        props: {
            links: links.data,
            homePage: homePage.data,
            events: events.data
        }
    }
}