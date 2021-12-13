import styles from './BDEMembers.module.sass'

import { getImage } from '@util/image'

export default function BDEMember ({ bdeMembers }) {

    return (<>
        <ul className={styles.members}>
            { bdeMembers.map(bdeMember => (
                <li className={styles.member}>
                    <img className={styles.image} src={getImage(bdeMember.image)} />
                    <div className={styles.name}>{bdeMember.firstName} {bdeMember.lastName}</div>
                    <div className={styles.role}>{bdeMember.role}</div>
                </li>
            )) }
        </ul>
    </>)
}