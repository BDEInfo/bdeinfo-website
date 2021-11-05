import axios from '@util/axios'

import styles from './HomePage.module.sass'

export default function HomePage ({ data }) {

    return (<>
        { data.mainMessage }
    </>)

}