import { firebase } from '../config/firebase.config';
import * as functions from 'firebase-functions';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppApiService {
  getIndex(): string {
    return 'Returning Index.';
  }
}
