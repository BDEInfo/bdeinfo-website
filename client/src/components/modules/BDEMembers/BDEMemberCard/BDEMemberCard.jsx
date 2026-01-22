import styles from './BDEMemberCard.module.sass'
import { getImage } from '@util/image'

export default function BDEMemberCard({ bdeMember }) {
    const sortedPostes = Array.isArray(bdeMember.postes)
        ? [...bdeMember.postes].sort((a, b) => b.weight - a.weight)
        : [];
    return (
        <li className={styles.memberCard}>
            <div className={styles.cardContentFront}>
                <img className={styles.image}
                     src={getImage(bdeMember.image)}
                     alt={"Photo du membre " + bdeMember.name}
                />
                <div className={styles.name}>
                    {bdeMember.name}
                </div>
                <div className={styles.role}>
                    {sortedPostes[0] && (
                        <span className={styles.pill}
                            style={{ backgroundColor: sortedPostes[0].color || '#7f8c8d' }}
                            title={sortedPostes[0].displayName}
                        >
                            {sortedPostes[0].displayName}
                        </span>
                    )}
                </div>
            </div>


            <div className={styles.cardContentBack}>
                <div className={styles.name}>
                    {bdeMember.name}
                </div>
                <div className={styles.link}>
                    <a className={"circleHover"} href={`mailto:${bdeMember.email}`}>
                        <i className={"fas fa-at circleHover"}></i>
                    </a>
                </div>
                <div className={styles.desc}>
                    {bdeMember.description || "Membre du BDE !"}
                </div>
                <div className={styles.roles}>
                    {sortedPostes.map((poste, index) => (
                        <span key={index} className={styles.pill}
                              style={{ backgroundColor: poste.color || '#7f8c8d' }}
                              title={poste.displayName}>
                            {poste.displayName}
                        </span>
                    ))}
                </div>
            </div>
        </li>
    );
}
