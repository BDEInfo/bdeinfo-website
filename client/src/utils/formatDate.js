import dateformat from 'dateformat'

export default function formatDate (date) {

    return dateformat(new Date(date), 'dd/mm à HH:MM')
}