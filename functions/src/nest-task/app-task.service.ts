import { Injectable } from '@nestjs/common';

@Injectable()
export class AppTaskService {
  async taskNotifyUpdate(): Promise<any> {
		try {
			console.log('taskNotifyUpdate->DONE');
		} catch (e) {
			const { message = 'taskNotifyUpdate: ERROR'} = e;
			throw Error(message);
		}
	}
}
