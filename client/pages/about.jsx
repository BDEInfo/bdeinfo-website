import About from '@template/About'
import Default from '@layout/Default'

import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

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
        axios('/link'),
        axios('/bde-information', { params: { populate: ['logo', 'image', 'statuts', 'mandat_actuel'] } }),
        axios('/bde-members', { params: { pagination: { pageSize: 50 }, populate: ['image', 'postes', 'mandat'] } }),
        axios('/mandats', { params: { sort: 'annee:desc', populate: ['logo'] } })
    ])

    // parse adherents google spreadsheet
    const adherents = await fetchAdherents()
    
    return {
        props: {
            links: formatJSONResponse(links.data),
            bdeInformations: formatJSONResponse(bdeInformations.data),
            bdeMembers: formatJSONResponse(bdeMembers.data),
            adherents,
            mandats: formatJSONResponse(mandats.data)
        },
        revalidate: 20
    }
}