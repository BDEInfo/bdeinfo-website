import '@style/fonts.sass'
import '@style/main.sass'
import '@style/scrollbar.sass'
import '@style/reset.sass'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

    return (
        <>
            <Head>
                <title>BDE Info</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
  
export default MyApp