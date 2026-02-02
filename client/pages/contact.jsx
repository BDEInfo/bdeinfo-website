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
    const [links, contactInfo, bdeInfo] = await Promise.all([
        strapi.single('link').find(),
        strapi.collection('contact-informations').find(),
        strapi.single('bde-information').find()
    ])

    return {
        props: {
            links: links.data,
            contactInfo: contactInfo.data,
            bdeInfo: bdeInfo.data,
        },
        revalidate: 20
    }
}