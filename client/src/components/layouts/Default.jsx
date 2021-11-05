import styles from './Default.module.sass'
import Header from '@module/Header'

const Default = ({children}) => (
    <div className={styles.default}>
        <Header />
        <div className={styles.content}>
            {children}
        </div>
    </div>
)

export default Default