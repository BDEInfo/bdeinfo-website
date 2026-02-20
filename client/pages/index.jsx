import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import strapi from '@util/strapi'

export default function Home ({ links, homePage, events }) {
    
    return (<>
        <Default links={links}>
            <HomePage homePage={homePage} events={events}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [linksResult, homePageResult, eventsResult] = await Promise.allSettled([
        strapi.single('link').find(),
        strapi.single('home-page').find(),
        strapi.collection('events').find({
            sort: 'startDate:DESC',
            pagination: { limit: 3 }
        })
    ])

    const links = linksResult.status === 'fulfilled' ? linksResult.value.data : {}
    const homePage = homePageResult.status === 'fulfilled' ? homePageResult.value.data : {}
    const events = eventsResult.status === 'fulfilled' ? eventsResult.value.data : []

    return {
        props: {
            links,
            homePage,
            events
        },
        revalidate: 120
    }
}