import styles from './BDEMembers.module.sass'

import BDEMemberCard from "@module/BDEMembers/BDEMemberCard/BDEMemberCard";

function getHighestWeightedPoste (bdeMember) {
    if (!bdeMember.postes || bdeMember.postes.length === 0) return undefined;
    return bdeMember.postes.reduce((highest, current) => {
        return current.weight > highest.weight ? current : highest;
    }, bdeMember.postes[0]);
}

const sortBDEMembers = (bdeMembers) => [...bdeMembers].sort((a, b) => {
    const posteA = getHighestWeightedPoste(a);
    const posteB = getHighestWeightedPoste(b);
    const weightA = posteA ? posteA.weight : 0;
    const weightB = posteB ? posteB.weight : 0;
    return weightB - weightA;
});

export default function BDEMember ({ bdeMembers }) {
    return (
        <ul className={styles.members}>
            {sortBDEMembers(bdeMembers).map(bdeMember =>
                // key on id for stable rendering
                <BDEMemberCard key={bdeMember.id} bdeMember={bdeMember} />
            )}
        </ul>
    );
}
