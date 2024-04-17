"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDBService = void 0;
const common_1 = require("@nestjs/common");
const normalization_helper_1 = require("../helpers/normalization.helper");
const validators_1 = require("../validators");
const interfaces_1 = require("../interfaces");
let AppDBService = class AppDBService {
    async onCreateCompany({ snapshot, context }) {
        try {
            const doc = snapshot.data();
            const { success } = await (0, normalization_helper_1.createOrUpdateRef)(doc, 'company', 'hubspot');
            console.log('onCreateCompany->DONE: ', { success });
            if (!success) {
                throw Error('onCreateCompany->ERROR: CREATING REF');
            }
            await (0, normalization_helper_1.createOrUpdateSnapshot)(doc, 'company', 'hubspot');
            console.log('onCreateCompany->DONE: ', { success });
            return;
        }
        catch (e) {
            const { message = 'onCreateCompany: ERROR' } = e;
            throw Error(message);
        }
    }
    async onUpdateCompany({ snapshot, context }) {
        try {
            if ((0, validators_1.isDocPropsChanged)(snapshot, interfaces_1.keysOfCompanySnapshot)) {
                const doc = snapshot.after.data();
                const { success } = await (0, normalization_helper_1.createOrUpdateSnapshot)(doc, 'company', 'hubspot');
                if (!success) {
                    throw Error('onUpdateCompany->ERROR: CREATING SNAPSHOT');
                }
                console.log('onUpdateCompany->DONE');
            }
            return;
        }
        catch (e) {
            const { message = 'onUpdateCompany: ERROR' } = e;
            throw Error(message);
        }
    }
    async onCreateContact({ snapshot, context }) {
        try {
            const doc = snapshot.data();
            const { success, result } = await (0, normalization_helper_1.createOrUpdateRef)(doc, 'contact', 'hubspot');
            if (!success) {
                throw Error('onUpdateCompany->ERROR: CREATING REF');
            }
            const { success: success_snapshot } = await (0, normalization_helper_1.createOrUpdateSnapshot)(doc, 'contact', 'hubspot');
            if (!success_snapshot) {
                throw Error('onUpdateCompany->ERROR: CREATING REF');
            }
            console.log('onCreateContact->DONE: ', { success, result });
            return;
        }
        catch (e) {
            const { message = 'onCreateContact: ERROR' } = e;
            throw Error(message);
        }
    }
    async onUpdateContact({ snapshot, context }) {
        try {
            if ((0, validators_1.isDocPropsChanged)(snapshot, interfaces_1.keysOfContactSnapshot)) {
                const doc = snapshot.after.data();
                const { success } = await (0, normalization_helper_1.createOrUpdateSnapshot)(doc, 'contact', 'hubspot');
                if (!success) {
                    throw Error('onUpdateCompany->ERROR: CREATING REF');
                }
                console.log('onUpdateContact->DONE', { success });
                return;
            }
            return;
        }
        catch (e) {
            const { message = 'onUpdateContact: ERROR' } = e;
            throw Error(message);
        }
    }
};
AppDBService = __decorate([
    (0, common_1.Injectable)()
], AppDBService);
exports.AppDBService = AppDBService;
//# sourceMappingURL=app-db.service.js.map