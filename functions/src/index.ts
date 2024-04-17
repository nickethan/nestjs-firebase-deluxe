import { firebase } from './config/firebase.config';
import * as functions from 'firebase-functions';

import { bootstrap_api } from './nest-api/main';
import { bootstrap_db } from './nest-db/main';
import { bootstrap_task } from './nest-task/main';

import { AppDBService } from './nest-db/app-db.service';
import { AppTaskService } from './nest-task/app-task.service';

export const api = functions.runWith({ memory: '2GB', timeoutSeconds: 150 })
  .https
  .onRequest(async (req, res) => {
    await bootstrap_api(req, res)
  });


export const db = {
  dbOnCreateCompany: functions.firestore.document(`source_companies/{doc}`)
    .onCreate(async (snapshot: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => 
      await bootstrap_db(
        async (appDBService: AppDBService) => await appDBService.onCreateCompany({snapshot, context})
      )
    ),
  dbOnUpdateCompany: functions.firestore.document(`source_companies/{doc}`)
    .onUpdate(async (snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>, context: functions.EventContext) => 
      await bootstrap_db(
        async (appDBService: AppDBService) => await appDBService.onUpdateCompany({snapshot, context})
      )
    ),
  dbOnCreateContact: functions.firestore.document(`source_contacts/{doc}`)
    .onCreate(async (snapshot: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => 
      await bootstrap_db(
        async (appDBService: AppDBService) => await appDBService.onCreateContact({snapshot, context})
      )
    ),
  dbOnUpdateContact: functions.firestore.document(`source_contacts/{doc}`)
    .onUpdate(async (snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>, context: functions.EventContext) => 
      await bootstrap_db(
        async (appDBService: AppDBService) => await appDBService.onUpdateContact({snapshot, context})
      )
    ),
};

export const tasks = {
  taskDoNotifyUpdate: functions
    .pubsub
    .schedule('0 * * * 1-5')
    .timeZone('America/Los_Angeles')
    .onRun(async () => 
      await bootstrap_task(
        async (appTaskService: AppTaskService) => await appTaskService.taskNotifyUpdate()
      )
    ),
};
