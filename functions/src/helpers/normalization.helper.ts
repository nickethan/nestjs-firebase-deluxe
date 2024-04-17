import * as short from 'short-uuid';
import { query, upset, where} from 'typesaurus';

import { CollectionType, LookupRef, ParentType } from '../interfaces/normalization.interface';
import { getAllowedProps, getCollection } from '../config';
import { BaseResponse } from '../interfaces';

export const createOrUpdateRef = async (doc: any, collection_type: CollectionType, parent_type: ParentType): Promise<BaseResponse> => {
  try {
    const { id: parent_id } = doc;

    const { collection: coll_ref } = getCollection('refs');

    const id = generateRefId(parent_id, collection_type);
    const uuid = generateGlobalId();
    
    const newdoc = { collection_type, id, parent_id, parent_type, uuid }
    await upset<LookupRef>(coll_ref, id, newdoc);

    return { success: true, result: newdoc};
  } catch(e) {
    const { message = 'createOrUpdateRef->ERROR' } = e;
    console.log('createOrUpdateRef->ERROR:', { message });
    return { success: false, error: message };
  }
};

export const createOrUpdateSnapshot = async (source_doc: any, collection_type: CollectionType, parent_type: ParentType): Promise<BaseResponse> => {
  try {
      const { id: parent_id } = source_doc;
      const allowed_props = getAllowedProps(collection_type);

      const { collection_snapshot } = getCollection(collection_type);

      const { success, result: snapshot = {} } = await parseDoc(source_doc, allowed_props);

      if (!success) {
        const err = 'createOrUpdateSnapshot-> ERROR: error parsing source_doc';
        throw Error(err);
      }

      const uuid = await getUUID(parent_id, parent_type);
      console.log('createOrUpdateSnapshot->UUID', { uuid, snapshot });

      await upset(collection_snapshot, uuid, {...snapshot, id: uuid, parent_id, parent_type, uuid });
      console.log('createOrUpdateSnapshot->SUCCESS');

      return { success: true };
  } catch(e) {
    const { message = 'createOrUpdateSnapshot->ERROR' } = e;
    console.log('createOrUpdateSnapshot->ERROR:', { message });
    return { success: false, error: message };
  }
};

export const getUUID = async (parent_id: string, parent_type: ParentType): Promise<any> => {
  try {
    const { collection: coll_ref } = getCollection('refs');
    
    const uuidref = await query(coll_ref, [
      where('parent_id', '==', parent_id),
      where('parent_type', '==', parent_type),
    ]);

    if (uuidref) {
      const doc = uuidref.find((o) => (o && o.data));
      const { uuid } = doc.data;
      return uuid;
    }

    const newuuid = generateGlobalId();
    return newuuid;
  } catch(e) {
    const { message = 'getUUID->ERROR' } = e;
    console.log('getUUID->ERROR:', { message });
    return 0;
  }
}

export const generateGlobalId = () => {
  const translator = short();
  const uuid = translator.new();
  return uuid;
}

export const generateRefId = (parent_id: string, collection_type: CollectionType) => {
  const id = collection_type + '_' + parent_id;
  return id;
}

export const generateNumericalId = () => {
  const translator = short('123456789', {
    consistentLength: true
  });
  
  const id = translator.new();
  return id;
}

export const parseDoc = async (doc: any, allowed_keys: string[]): Promise<{ success: boolean; result?: any; error?: string; }> => {
  try {
    let newdoc = {};
    const { properties = {} } = doc;
    
    Object.keys(properties).map((k) => {
      const haskey = allowed_keys.includes(k);
      if (haskey) {
        console.log({ haskey, k });
        const v = properties[k] || 'empty';
        newdoc = {...newdoc, [k]: v }
      }
    });

    return { success: true, result: newdoc };
  } catch(e) {
    const { message = 'createOrUpdateSnapshot->ERROR' } = e;
    console.log('createOrUpdateSnapshot->ERROR:', { message });
    return { success: false, error: message };
  }
};

export default { createOrUpdateRef };
