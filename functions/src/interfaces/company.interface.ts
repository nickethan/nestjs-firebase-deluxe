import { keys } from 'ts-transformer-keys';
import { SnapshotBase } from './normalization.interface';

export interface CompanyRef {
  id: string;
  parent_id: string;
  parent_type: string;
  uuid: string;
}

export interface CompanySnapshot extends SnapshotBase {
  email: string;
  description: string;
  domain: string;
  website:string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  timezone: string;
}

export const keysOfCompanySnapshot = keys<CompanySnapshot>();
