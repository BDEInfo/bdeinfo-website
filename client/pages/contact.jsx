import Default from "@layout/Default";
import Contact from "@template/Contact";
import strapi from "@util/strapi";

export default function App ({ links, contactInfo, bdeInfo }) {

    return (<>
        <Default links={links}>
            <Contact contactInfo={contactInfo} bdeInfo={bdeInfo}></Contact>
        </Default>
    </>)
}

export async function getStaticProps () {
    const [linksResult, contactInfoResult, bdeInfoResult] = await Promise.allSettled([
        strapi.single('link').find(),
        strapi.collection('contact-informations').find(),
        strapi.single('bde-information').find()
    ])

    const links = linksResult.status === 'fulfilled' ? linksResult.value.data : {}
    const contactInfo = contactInfoResult.status === 'fulfilled' ? contactInfoResult.value.data : []
    const bdeInfo = bdeInfoResult.status === 'fulfilled' ? bdeInfoResult.value.data : {}

    return {
        props: {
            links,
            contactInfo,
            bdeInfo,
        },
        revalidate: 120
    }
}