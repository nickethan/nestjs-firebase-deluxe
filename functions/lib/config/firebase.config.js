"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
const firebase = require("firebase-admin");
exports.firebase = firebase;
const serviceAccount = require("../credentials/bluefields-backbone-firebase-adminsdk-ttpmn-5e5206979e.json");
const serviceProject = 'bluefields-backbone';
const fbConfig = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
};
firebase.initializeApp({
    credential: firebase.credential.cert(fbConfig),
    databaseURL: `https://${serviceProject}.firebaseio.com`,
    storageBucket: `https://${serviceProject}.appspot.com`
});
//# sourceMappingURL=firebase.config.js.map