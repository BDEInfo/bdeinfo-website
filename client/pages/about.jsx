import About from '@template/About'
import Default from '@layout/Default'

import strapi from '@util/strapi'
import { fetchAdherents } from '@util/adherents'

export default function App ({ links, bdeInformations, bdeMembers, adherents, mandats }) {

    return (<>
        <Default links={links}>
            <About bdeInformations={bdeInformations} bdeMembers={bdeMembers} adherents={adherents} mandats={mandats}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [links, bdeInformations, bdeMembers, mandats] = await Promise.all([
        strapi.single('link').find(),
        strapi.single('bde-information').find({
            populate: ['logo', 'image', 'statuts', 'mandat_actuel']
        }),
        strapi.collection('bde-members').find({
            populate: ['image', 'postes', 'mandat'],
            pagination: { pageSize: 50 }
        }),
        strapi.collection('mandats').find({
            populate: ['logo'],
            sort: 'annee:desc'
        })
    ])

    // parse adherents google spreadsheet
    const adherents = await fetchAdherents()
    
    return {
        props: {
            links: links.data,
            bdeInformations: bdeInformations.data,
            bdeMembers: bdeMembers.data,
            adherents,
            mandats: mandats.data
        },
        revalidate: 20
    }
}