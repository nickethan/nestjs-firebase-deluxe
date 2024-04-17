import { SnapshotBase } from "./normalization.interface";

export interface BidRef {
  id: string;
  parent_id: string;
  parent_type: string;
  uuid: string;
}

export interface BidSnapshot extends SnapshotBase {
  date: number;
  contact: string;
  bid_id: string;
}
