"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedProps = exports.getCollection = exports.collections = void 0;
const interfaces_1 = require("../interfaces");
const typesaurus_1 = require("typesaurus");
exports.collections = [
    { collection_type: 'contact', collection_source: (0, typesaurus_1.collection)('source_contact'), collection_snapshot: (0, typesaurus_1.collection)('snapshots_contact'), allowed_props: interfaces_1.keysOfContactSnapshot },
    { collection_type: 'company', collection_source: (0, typesaurus_1.collection)('source_company'), collection_snapshot: (0, typesaurus_1.collection)('snapshots_company'), allowed_props: interfaces_1.keysOfCompanySnapshot },
    { collection_type: 'refs', collection: (0, typesaurus_1.collection)('globalrefs') },
];
const getCollection = (coll_type) => {
    const coll = exports.collections.find(({ collection_type }) => (collection_type === coll_type));
    return coll;
};
exports.getCollection = getCollection;
const getAllowedProps = (coll_type) => {
    const coll = exports.collections.find(({ collection_type }) => (collection_type === coll_type));
    if (!coll) {
        console.log('getAllowedProps->ERROR: NO COLLECTION');
        return [];
    }
    return coll.allowed_props;
};
exports.getAllowedProps = getAllowedProps;
//# sourceMappingURL=collection.config.js.map