import styles from './Default.module.sass'
import Header from '@module/Header/Header'
import Script from 'next/script'
import '@fortawesome/fontawesome-free/css/all.min.css'

export default function Default ({ children, links }) {

    return (<>
        <div className={styles.default}>
            <Header links={links}/>
            <div className={styles.content}>
                {children}
            </div>
        </div>

        <div id="cursorCircle" suppressHydrationWarning></div>

        <Script
            src="/scripts/circleCursor.js"
            strategy="afterInteractive"
        />
    </>)
}