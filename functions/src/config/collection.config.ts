import { firebase } from './firebase.config';
import { CollectionType, CompanySnapshot, ContactSnapshot, LookupRef, keysOfCompanySnapshot, keysOfContactSnapshot } from '../interfaces';
import { Collection, collection } from 'typesaurus';

export interface CollectionStore {
  collection_source: Collection<any>,
  collection_snapshot: Collection<any>,
  collection_type: CollectionType,
}

export const collections = [
  { collection_type: 'contact', collection_source: collection<any>('source_contact'), collection_snapshot: collection<ContactSnapshot>('snapshots_contact'), allowed_props: keysOfContactSnapshot },
  { collection_type: 'company', collection_source: collection<any>('source_company'), collection_snapshot: collection<CompanySnapshot>('snapshots_company'), allowed_props: keysOfCompanySnapshot },
  { collection_type: 'refs', collection: collection<LookupRef>('globalrefs') },
];

export const getCollection = (coll_type: CollectionType) => {
  const coll = collections.find(({ collection_type }) => (collection_type === coll_type));
  return coll;
}

export const getAllowedProps = (coll_type: CollectionType) => {
  const coll = collections.find(({ collection_type }) => (collection_type === coll_type));

  if (!coll) {
    console.log('getAllowedProps->ERROR: NO COLLECTION')
    return [];
  }
  return coll.allowed_props;
}
