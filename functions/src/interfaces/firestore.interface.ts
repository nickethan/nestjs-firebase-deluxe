import * as functions from 'firebase-functions';

export interface DocCreateEvent {
  snapshot: functions.firestore.QueryDocumentSnapshot, 
  context: functions.EventContext 
}

export interface DocUpdateEvent {
  snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>, 
  context: functions.EventContext 
}

