export interface ProcessTree {
    [key: string]: string | ProcessTree;
}
/**
 * The findPath function is designed to traverse a nested object structure (referred to as a tree) and find the path of keys leading to a specified target value. This function can be particularly useful in applications where you need to navigate through deeply nested objects and dynamically determine the location of certain values.
 * @param tree : constant data tree 
 * @param targetValue : the key which need to findout in tree.
 * @returns 
 */
export function findPath(tree: ProcessTree, targetValue: string): string[] {
    let path: string[] = [];

    function recursiveSearch(currentNode: ProcessTree, currentPath: string[]): boolean {
        for (const key in currentNode) {
            const value = currentNode[key];
            if (value === targetValue) {
                path = [...currentPath, key];
                return true;
            } else if (typeof value === 'object' && value !== null) {
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

export function generateId(prefix: string): string {
    return prefix + Math.random().toString(36).substring(2, 11);
}
