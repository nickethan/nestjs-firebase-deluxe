import * as firebase from 'firebase-admin';
import * as serviceAccount from '../credentials/firebase-creds.json';

const serviceProject = '';

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

export { firebase };
