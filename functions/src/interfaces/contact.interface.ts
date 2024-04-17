import { keys } from 'ts-transformer-keys';
import { SnapshotBase } from './normalization.interface';

export interface ContactRef {
  id: string;
  parent_id: string;
  parent_type: string;
  uuid: string;
}

export interface ContactSnapshot extends SnapshotBase {
  firstname: string;
  lastname: string;
  email: string;
  work_email: string;
  phone: string;
  website: string;
  jobtitle: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  associatedcompanyid: number;
}

export const keysOfContactSnapshot = keys<ContactSnapshot>();

/*
Relationships:
- companies ???

Properties:
- associatedcompanyid

- firstname
- lastname

- email
- work_email
- phone
- website
- jobtitle

- city
- state
- country
- zip

*/