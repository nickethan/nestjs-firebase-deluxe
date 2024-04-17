"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocPropsChanged = void 0;
const isDocPropsChanged = (change, propNames) => {
    const before = change.before.data();
    const after = change.after.data();
    if (!before || !after) {
        return false;
    }
    else {
        const ischanged = propNames.filter((propName) => (before['properties'][propName] !== after['properties'][propName]));
        return (ischanged.length > 0);
    }
};
exports.isDocPropsChanged = isDocPropsChanged;
//# sourceMappingURL=isDocPropsChanged.validator.js.map