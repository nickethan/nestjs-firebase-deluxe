import { firebase } from '../config/firebase.config';
import * as functions from 'firebase-functions';
import { Injectable } from '@nestjs/common';
import { createOrUpdateRef, createOrUpdateSnapshot } from '../helpers/normalization.helper';
import { DocCreateEvent, DocUpdateEvent } from '../interfaces/firestore.interface';
import { isDocPropsChanged } from '../validators';
import { keysOfCompanySnapshot, keysOfContactSnapshot } from '../interfaces';


@Injectable()
export class AppDBService {
	async onCreateCompany({
		snapshot, 
		context 
	} : DocCreateEvent): Promise<void> {
		try {
      const doc = snapshot.data();

      const { success } = await createOrUpdateRef(doc, 'company', 'hubspot');
			
			console.log('onCreateCompany->DONE: ', { success });

			if (!success) {
				throw Error('onCreateCompany->ERROR: CREATING REF');
			}

			await createOrUpdateSnapshot(doc, 'company', 'hubspot');
			
			console.log('onCreateCompany->DONE: ', { success });

      return;
		} catch (e) {
			const { message = 'onCreateCompany: ERROR'} = e;
			throw Error(message);
		}
	}

  async onUpdateCompany({
		snapshot, 
		context 
	} : DocUpdateEvent): Promise<void> {
		try {
			if (isDocPropsChanged(snapshot, keysOfCompanySnapshot)) {
				const doc = snapshot.after.data();
				const { success } = await createOrUpdateSnapshot(doc, 'company', 'hubspot');

				if (!success) {
					throw Error('onUpdateCompany->ERROR: CREATING SNAPSHOT');
				}

				console.log('onUpdateCompany->DONE');
			}

			return;
		} catch (e) {
			const { message = 'onUpdateCompany: ERROR'} = e;
			throw Error(message);
		}
	}

  async onCreateContact({
		snapshot, 
		context 
	} : DocCreateEvent): Promise<void> {
		try {
      const doc = snapshot.data();
      const { success, result }  = await createOrUpdateRef(doc, 'contact', 'hubspot');

			if (!success) {
				throw Error('onUpdateCompany->ERROR: CREATING REF');
			}
			 
			const { success: success_snapshot } = await createOrUpdateSnapshot(doc, 'contact', 'hubspot');

			if (!success_snapshot) {
				throw Error('onUpdateCompany->ERROR: CREATING REF');
			}

			console.log('onCreateContact->DONE: ', { success, result });

      return;
		} catch (e) {
			const { message = 'onCreateContact: ERROR'} = e;
			throw Error(message);
		}
	}

  async onUpdateContact({
		snapshot, 
		context 
	} : DocUpdateEvent): Promise<void> {
		try {
			if (isDocPropsChanged(snapshot, keysOfContactSnapshot)) {
				const doc = snapshot.after.data();
		  
				const { success } = await createOrUpdateSnapshot(doc, 'contact', 'hubspot');

				if (!success) {
					throw Error('onUpdateCompany->ERROR: CREATING REF');
				}

				console.log('onUpdateContact->DONE', { success });

				return;
			}

      return;
		} catch (e) {
			const { message = 'onUpdateContact: ERROR'} = e;
			throw Error(message);
		}
	}

	async onCreateBid({
		snapshot, 
		context 
	} : DocCreateEvent): Promise<void> {
		try {
      		const doc = snapshot.data();
      		const { success, result }  = await createOrUpdateRef(doc, 'bid', 'bids');

			if (!success) {
				throw Error('onCreateBid->ERROR: CREATING REF');
			}
			 
			const { success: success_snapshot } = await createOrUpdateSnapshot(doc, 'bid', 'bids');

			if (!success_snapshot) {
				throw Error('onCreateBid->ERROR: CREATING REF');
			}

			console.log('onCreateBid->DONE: ', { success, result });

      		return;
		} catch (e) {
			const { message = 'onCreateBid: ERROR'} = e;
			throw Error(message);
		}
	}
}
