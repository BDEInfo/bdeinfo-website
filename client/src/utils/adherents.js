import { GoogleSpreadsheet } from 'google-spreadsheet'

// Cache pour éviter de récupérer les données trop souvent
let adherentsCache = {}
let lastFetchTime = {}
const CACHE_DURATION = 60 * 1000 // 1 minute en millisecondes

export async function fetchAdherents (googleSheetId, forceRefresh = false) {
    // Vérifier si le cache est encore valide pour ce sheet spécifique
    const now = Date.now()
    const cacheIsValid = adherentsCache[googleSheetId] && (now - (lastFetchTime[googleSheetId] || 0)) < CACHE_DURATION

    if (!forceRefresh && cacheIsValid) {
        console.log(`📦 Utilisation du cache pour les adhérents (${googleSheetId})`)
        return adherentsCache[googleSheetId]
    }

    try {
        // Validation des paramètres
        if (!googleSheetId) {
            console.error('❌ google_sheet_id non fourni')
            return []
        }
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error('❌ Credentials Google Service Account manquants')
            return []
        }

        console.log(`🔄 Récupération des adhérents depuis Google Sheets (${googleSheetId})...`)
        const startTime = Date.now()

        const doc = new GoogleSpreadsheet(googleSheetId)

        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        })

        await doc.loadInfo()

        if (!doc.sheetsByIndex[0]) {
            console.error('❌ Aucune feuille trouvée dans le Google Sheet')
            return []
        }

        const sheet = doc.sheetsByIndex[0]

        const rows = await sheet.getRows({
            limit: 1000,
            offset: 0
        })

        const duration = Date.now() - startTime
        console.log(`✅ ${rows.length} lignes récupérées en ${duration}ms`)

        if (rows.length < 1) {
            adherentsCache[googleSheetId] = []
            lastFetchTime[googleSheetId] = now
            return []
        }

        // Transformation avec validation des données
        const adherents = rows
            .map(row => {
                const lastName = row._rawData[0]
                const firstName = row._rawData[1]

                if (!lastName || !firstName) return null

                return {
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                }
            })
            .filter(Boolean)

        console.log(`📊 ${adherents.length} adhérents valides`)

        // Mise à jour du cache
        adherentsCache[googleSheetId] = adherents
        lastFetchTime[googleSheetId] = now

        return adherents

    } catch (e) {
        console.error('❌ Erreur lors de la récupération des adhérents:', e.message)

        if (adherentsCache[googleSheetId]) {
            console.log('⚠️ Utilisation du cache suite à une erreur')
            return adherentsCache[googleSheetId]
        }

        return []
    }
}

