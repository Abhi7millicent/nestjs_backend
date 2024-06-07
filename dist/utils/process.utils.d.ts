export interface ProcessTree {
    [key: string]: string | ProcessTree;
}
export declare function findPath(tree: ProcessTree, targetValue: string): string[];
export declare function generateId(prefix: string): string;
