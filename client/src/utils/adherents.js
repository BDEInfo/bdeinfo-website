const { GoogleSpreadsheet } = require('google-spreadsheet')

export async function fetchAdherents () {

    try {

        const doc = new GoogleSpreadsheet(process.env.GSHEET_ADHERENTS_ID)
        
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        })

        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0]

        const rows = await sheet.getRows()
        
        if (rows.length < 1) return []
        else {
            return rows.map(row => ({ firstName: row._rawData[1], lastName: row._rawData[0] }))
        }

    } catch (e) {
        console.log(e)
        return []
    }


}