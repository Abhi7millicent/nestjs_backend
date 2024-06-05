export const ErrorMessage = {
    ID_NOT_FOUND: (data: string) => `Data not found for this id: ${data}`,
    KEY_NOT_FOUND: (key: string) => `Key not found: ${key}`,
    NOT_ARRAY_OR_OBJECT: (key: string) => `${key} is not an array or an object`,
    ARRAY_NOT_FOUND: (key: string) => `Array for this key ${key} not found or is not an array`,
    NOT_FOUND: 'Not Found Exception',
    UNEXPECTED_ERROR: 'Unexpected Error',
    NOT_CREATED: 'Failed to create',
    NOT_UPDATED: (error: string) => `Error updating document: ${error}`,
}; 