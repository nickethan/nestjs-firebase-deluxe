"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocPropChanged = void 0;
const isDocPropChanged = (change, propName) => {
    const before = change.before.data();
    const after = change.after.data();
    if (!before || !after) {
        return false;
    }
    else {
        return (before['properties'][propName] !== after['properties'][propName]);
    }
};
exports.isDocPropChanged = isDocPropChanged;
//# sourceMappingURL=isDocPropChanged.validator.js.map