import About from '@template/About'
import Default from '@layout/Default'

import axios from '@util/axios'

export default function App ({ bdeInformations, bdeMembers}) {

    return (<>
        <Default>
            <About bdeInformations={bdeInformations} bdeMembers={bdeMembers}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [bdeInformations, bdeMembers] = await Promise.all([
        axios('/bde-informations'),
        axios('/bde-members')
    ])

    return {
        props: {
            bdeInformations: bdeInformations.data,
            bdeMembers: bdeMembers.data
        }
    }
}