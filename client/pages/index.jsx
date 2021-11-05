import HomePage from '@template/HomePage'
import Default from '@layout/Default'
import axios from '@util/axios'

export default function App (props) {
    
    return (
        <Default>
            <HomePage data={props}/>
        </Default>
    )
}

export async function getStaticProps () {

    const homePage = await axios('/home-page')
    return {
        props: {
            mainMessage: homePage.data.mainMessage,
        }
    }
}