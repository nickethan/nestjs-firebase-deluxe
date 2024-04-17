"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDoc = exports.generateNumericalId = exports.generateRefId = exports.generateGlobalId = exports.getUUID = exports.createOrUpdateSnapshot = exports.createOrUpdateRef = void 0;
const short = require("short-uuid");
const typesaurus_1 = require("typesaurus");
const config_1 = require("../config");
const createOrUpdateRef = async (doc, collection_type, parent_type) => {
    try {
        const { id: parent_id } = doc;
        const { collection: coll_ref } = (0, config_1.getCollection)('refs');
        const id = (0, exports.generateRefId)(parent_id, collection_type);
        const uuid = (0, exports.generateGlobalId)();
        const newdoc = { collection_type, id, parent_id, parent_type, uuid };
        await (0, typesaurus_1.upset)(coll_ref, id, newdoc);
        return { success: true, result: newdoc };
    }
    catch (e) {
        const { message = 'createOrUpdateRef->ERROR' } = e;
        console.log('createOrUpdateRef->ERROR:', { message });
        return { success: false, error: message };
    }
};
exports.createOrUpdateRef = createOrUpdateRef;
const createOrUpdateSnapshot = async (source_doc, collection_type, parent_type) => {
    try {
        const { id: parent_id } = source_doc;
        const allowed_props = (0, config_1.getAllowedProps)(collection_type);
        const { collection_snapshot } = (0, config_1.getCollection)(collection_type);
        const { success, result: snapshot = {} } = await (0, exports.parseDoc)(source_doc, allowed_props);
        if (!success) {
            const err = 'createOrUpdateSnapshot-> ERROR: error parsing source_doc';
            throw Error(err);
        }
        const uuid = await (0, exports.getUUID)(parent_id, parent_type);
        console.log('createOrUpdateSnapshot->UUID', { uuid, snapshot });
        await (0, typesaurus_1.upset)(collection_snapshot, uuid, Object.assign(Object.assign({}, snapshot), { id: uuid, parent_id, parent_type, uuid }));
        console.log('createOrUpdateSnapshot->SUCCESS');
        return { success: true };
    }
    catch (e) {
        const { message = 'createOrUpdateSnapshot->ERROR' } = e;
        console.log('createOrUpdateSnapshot->ERROR:', { message });
        return { success: false, error: message };
    }
};
exports.createOrUpdateSnapshot = createOrUpdateSnapshot;
const getUUID = async (parent_id, parent_type) => {
    try {
        const { collection: coll_ref } = (0, config_1.getCollection)('refs');
        const uuidref = await (0, typesaurus_1.query)(coll_ref, [
            (0, typesaurus_1.where)('parent_id', '==', parent_id),
            (0, typesaurus_1.where)('parent_type', '==', parent_type),
        ]);
        if (uuidref) {
            const doc = uuidref.find((o) => (o && o.data));
            const { uuid } = doc.data;
            return uuid;
        }
        const newuuid = (0, exports.generateGlobalId)();
        return newuuid;
    }
    catch (e) {
        const { message = 'getUUID->ERROR' } = e;
        console.log('getUUID->ERROR:', { message });
        return 0;
    }
};
exports.getUUID = getUUID;
const generateGlobalId = () => {
    const translator = short();
    const uuid = translator.new();
    return uuid;
};
exports.generateGlobalId = generateGlobalId;
const generateRefId = (parent_id, collection_type) => {
    const id = collection_type + '_' + parent_id;
    return id;
};
exports.generateRefId = generateRefId;
const generateNumericalId = () => {
    const translator = short('123456789', {
        consistentLength: true
    });
    const id = translator.new();
    return id;
};
exports.generateNumericalId = generateNumericalId;
const parseDoc = async (doc, allowed_keys) => {
    try {
        let newdoc = {};
        const { properties = {} } = doc;
        Object.keys(properties).map((k) => {
            const haskey = allowed_keys.includes(k);
            if (haskey) {
                console.log({ haskey, k });
                const v = properties[k] || 'empty';
                newdoc = Object.assign(Object.assign({}, newdoc), { [k]: v });
            }
        });
        return { success: true, result: newdoc };
    }
    catch (e) {
        const { message = 'createOrUpdateSnapshot->ERROR' } = e;
        console.log('createOrUpdateSnapshot->ERROR:', { message });
        return { success: false, error: message };
    }
};
exports.parseDoc = parseDoc;
exports.default = { createOrUpdateRef: exports.createOrUpdateRef };
//# sourceMappingURL=normalization.helper.js.map