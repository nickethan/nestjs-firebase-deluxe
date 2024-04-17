export type CollectionType =
| 'bid'
| 'company'
| 'contact'
| 'deal'
| 'project'
| 'refs';

export type ParentType = 
| 'bids'
| 'hubspot'
| 'docusign'
| 'google_analytics';

export interface LookupRef {
  id: string;
  parent_id: string;
  parent_type: string;
  collection_type: CollectionType;
  uuid: string;
}

export interface SnapshotBase {
  id: string;
  parent_id: string;
  parent_type: string;
  collection_type: CollectionType;
  uuid: string;
}
