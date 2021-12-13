import About from '@template/About'
import Default from '@layout/Default'

import axios from '@util/axios'
import { formatJSONResponse } from '@util/format'

import { fetchAdherents } from '@util/adherents'

export default function App ({ links, bdeInformations, bdeMembers, adherents }) {

    return (<>
        <Default links={links}>
            <About bdeInformations={bdeInformations} bdeMembers={bdeMembers} adherents={adherents}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [links, bdeInformations, bdeMembers] = await Promise.all([
        axios('/link'),
        axios('/bde-information'),
        axios('/bde-members')
    ])

    // parse adherents google spreadsheet
    const adherents = await fetchAdherents()
    
    return {
        props: {
            links: formatJSONResponse(links.data),
            bdeInformations: formatJSONResponse(bdeInformations.data),
            bdeMembers: formatJSONResponse(bdeMembers.data),
            adherents
        }
    }
}