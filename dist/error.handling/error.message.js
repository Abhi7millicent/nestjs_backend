"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
exports.ErrorMessage = {
    ID_NOT_FOUND: (data) => `Data not found for this id: ${data}`,
    KEY_NOT_FOUND: (key) => `Key not found: ${key}`,
    NOT_ARRAY_OR_OBJECT: (key) => `${key} is not an array or an object`,
    ARRAY_NOT_FOUND: (key) => `Array for this key ${key} not found or is not an array`,
    NOT_FOUND: 'Not Found Exception',
    UNEXPECTED_ERROR: 'Unexpected Error',
    NOT_CREATED: 'Failed to create',
    NOT_UPDATED: (error) => `Error updating document: ${error}`,
};
//# sourceMappingURL=error.message.js.map