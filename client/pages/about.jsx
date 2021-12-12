import About from '@template/About'
import Default from '@layout/Default'

import axios from '@util/axios'
import formatJSONResponse from '@util/formatJSONResponse'

export default function App ({ bdeInformations, bdeMembers}) {

    return (<>
        <Default>
            <About bdeInformations={bdeInformations} bdeMembers={bdeMembers}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [bdeInformations, bdeMembers] = await Promise.all([
        axios('/bde-information'),
        axios('/bde-members')
    ])

    return {
        props: {
            bdeInformations: formatJSONResponse(bdeInformations.data),
            bdeMembers: formatJSONResponse(bdeMembers.data)
        }
    }
}