"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.findPath = void 0;
function findPath(tree, targetValue) {
    let path = [];
    function recursiveSearch(currentNode, currentPath) {
        for (const key in currentNode) {
            const value = currentNode[key];
            if (value === targetValue) {
                path = [...currentPath, key];
                return true;
            }
            else if (typeof value === 'object' && value !== null) {
                if (recursiveSearch(value, [...currentPath, key])) {
                    return true;
                }
            }
        }
        return false;
    }
    recursiveSearch(tree, []);
    return path;
}
exports.findPath = findPath;
function generateId(prefix) {
    return prefix + Math.random().toString(36).substring(2, 11);
}
exports.generateId = generateId;
//# sourceMappingURL=process.utils.js.map