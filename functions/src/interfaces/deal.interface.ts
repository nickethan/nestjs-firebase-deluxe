import { SnapshotBase } from "./normalization.interface";

export interface DealRef {
  id: string;
  parent_id: string;
  parent_type: string;
  uuid: string;
}

export interface DealSnapshot extends SnapshotBase {
  contact: string;
  date: number;
  title: string;
}
