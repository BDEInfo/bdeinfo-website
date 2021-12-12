import dateformat from 'dateformat'

export default function formatDate (date) {

    return dateformat(date, 'dd/mm à HH:MM')
}