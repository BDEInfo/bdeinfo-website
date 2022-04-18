import styles from './BDEMembers.module.sass'

import { getImage } from '@util/image'

const sortBDEMembers = (bdeMembers) => bdeMembers.sort((a, b) => b.poste.weight - a.poste.weight)

export default function BDEMember ({ bdeMembers }) {

    return (<>
        <ul className={styles.members}>
            { sortBDEMembers(bdeMembers).map(bdeMember => (
                <li className={styles.member}>
                    <img className={styles.image} src={getImage(bdeMember.image)} />
                    <div className={styles.name}>{bdeMember.firstName} {bdeMember.lastName}</div>
                    <div className={styles.role}>{bdeMember.poste.grade} {bdeMember.poste.name}</div>
                </li>
            )) }
        </ul>
    </>)
}