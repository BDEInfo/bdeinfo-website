import About from '@template/About'
import Default from '@layout/Default'

import strapi from '@util/strapi'
import { fetchAdherents } from '@util/adherents'

export default function App ({ links, bdeInformations, bdeMembers, adherents, adherentsConfig, mandats }) {

    return (<>
        <Default links={links}>
            <About bdeInformations={bdeInformations} bdeMembers={bdeMembers} adherents={adherents} adherentsConfig={adherentsConfig} mandats={mandats}/>
        </Default>
    </>)
}

export async function getStaticProps () {

    const [linksResult, bdeInformationsResult, bdeMembersResult, mandatsResult] = await Promise.allSettled([
        strapi.single('link').find(),
        strapi.single('bde-information').find({
            populate: ['logo', 'image', 'statuts', 'mandat_actuel', 'cards']
        }),
        strapi.collection('bde-members').find({
            populate: ['image', 'postes', 'mandat'],
            pagination: { pageSize: 50 }
        }),
        strapi.collection('mandats').find({
            populate: ['logo', 'adherants'],
            sort: 'annee:desc'
        })
    ])

    const links = linksResult.status === 'fulfilled' ? linksResult.value.data : {}
    const bdeInformations = bdeInformationsResult.status === 'fulfilled' ? bdeInformationsResult.value.data : {}
    const bdeMembers = bdeMembersResult.status === 'fulfilled' ? bdeMembersResult.value.data : []
    const mandats = mandatsResult.status === 'fulfilled' ? mandatsResult.value.data : []

    // Récupérer les adhérents selon la configuration du mandat actuel
    let adherents = []
    let adherentsConfig = { type: 'none' }
    const mandatActuel = bdeInformations?.mandat_actuel

    if (mandatActuel) {
        // Trouver le mandat actuel dans la liste des mandats
        const currentMandat = mandats.find(m => m.id === mandatActuel.id)

        if (currentMandat?.adherants) {
            const adherantsConfig = currentMandat.adherants
            adherentsConfig = { type: adherantsConfig.type }

            if (adherantsConfig.type === 'json' && adherantsConfig.json_data) {
                // Utiliser les données JSON directement
                adherents = adherantsConfig.json_data
                console.log(`📋 ${adherents.length} adhérents chargés depuis JSON`)
            } else if (adherantsConfig.type === 'google_docs' && adherantsConfig.google_sheet_id) {
                // Récupérer depuis Google Sheets
                adherents = await fetchAdherents(adherantsConfig.google_sheet_id)
                console.log(`📊 ${adherents.length} adhérents chargés depuis Google Sheets`)
            } else if (adherantsConfig.type === 'none') {
                console.log(`⚪ Adhérents désactivés pour ce mandat`)
            }
        }
    }

    return {
        props: {
            links,
            bdeInformations,
            bdeMembers,
            adherents,
            adherentsConfig,
            mandats
        },
        revalidate: 120
    }
}