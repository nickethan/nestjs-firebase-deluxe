
import { Change } from 'firebase-functions';

export const isDocPropChanged = <T>(change: Change<FirebaseFirestore.DocumentSnapshot>, propName: string): boolean => {
    const before = change.before.data();
    const after = change.after.data();
    
    if (!before || !after) {
        return false;
    } else {
        return (before['properties'][propName] !== after['properties'][propName]);
    }
}
