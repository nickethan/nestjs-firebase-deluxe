"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.db = exports.api = void 0;
const functions = require("firebase-functions");
const main_1 = require("./nest-api/main");
const main_2 = require("./nest-db/main");
const main_3 = require("./nest-task/main");
exports.api = functions.runWith({ memory: '2GB', timeoutSeconds: 150 })
    .https
    .onRequest(async (req, res) => {
    await (0, main_1.bootstrap_api)(req, res);
});
exports.db = {
    dbOnCreateCompany: functions.firestore.document(`source_companies/{doc}`)
        .onCreate(async (snapshot, context) => await (0, main_2.bootstrap_db)(async (appDBService) => await appDBService.onCreateCompany({ snapshot, context }))),
    dbOnUpdateCompany: functions.firestore.document(`source_companies/{doc}`)
        .onUpdate(async (snapshot, context) => await (0, main_2.bootstrap_db)(async (appDBService) => await appDBService.onUpdateCompany({ snapshot, context }))),
    dbOnCreateContact: functions.firestore.document(`source_contacts/{doc}`)
        .onCreate(async (snapshot, context) => await (0, main_2.bootstrap_db)(async (appDBService) => await appDBService.onCreateContact({ snapshot, context }))),
    dbOnUpdateContact: functions.firestore.document(`source_contacts/{doc}`)
        .onUpdate(async (snapshot, context) => await (0, main_2.bootstrap_db)(async (appDBService) => await appDBService.onUpdateContact({ snapshot, context }))),
};
exports.tasks = {
    taskDoNotifyUpdate: functions
        .pubsub
        .schedule('0 * * * 1-5')
        .timeZone('America/Los_Angeles')
        .onRun(async () => await (0, main_3.bootstrap_task)(async (appTaskService) => await appTaskService.taskNotifyUpdate())),
};
//# sourceMappingURL=index.js.map