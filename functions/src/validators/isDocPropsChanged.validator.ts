
import { Change } from 'firebase-functions';

export const isDocPropsChanged = <T>(change: Change<FirebaseFirestore.DocumentSnapshot>, propNames: string[]): boolean => {
    const before = change.before.data();
    const after = change.after.data();
    
    if (!before || !after) {
        return false;
    } else {
        const ischanged = propNames.filter((propName) => (before['properties'][propName] !== after['properties'][propName]));
        return (ischanged.length > 0);
    }
}
