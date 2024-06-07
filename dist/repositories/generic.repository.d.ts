/// <reference types="mongoose/types/PipelineStage" />
import { Model, FilterQuery, QueryOptions, PopulatedDoc } from 'mongoose';
import { updateResponseDto } from 'src/dto/update.response.dto';
interface FindAllOptions<T> extends QueryOptions {
    sort?: any;
    limit?: number;
    skip?: number;
    select?: any;
    populate?: any;
}
export declare abstract class GenericRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(entity: Partial<T>): Promise<T>;
    createByKey(id: string, keyPath: string[], data: any): Promise<any>;
    update(criteria: FilterQuery<T>, update: Partial<T>): Promise<updateResponseDto & {
        updatedData: T;
    }>;
    updateByKey(id: string, keyPath: string[], subId: string, data: any): Promise<any>;
    delete(id: string): Promise<T>;
    deleteByKey(id: string, keyPath: string[], subId: string): Promise<any>;
    softDelete(id: string): Promise<T>;
    softDeleteByKey(id: string, keyPath: string[], subId: string): Promise<any>;
    findAll(criteria?: FilterQuery<T>, options?: FindAllOptions<T>): Promise<T[]>;
    findById(id: string): Promise<T>;
    findOne(criteria?: FilterQuery<T>, options?: FindAllOptions<T>): Promise<T | null>;
    restore(id: string): Promise<T>;
    findAllParam(criteria?: any, sort?: any, limit?: number, select?: string, skip?: number, populate?: string | QueryOptions): Promise<Array<PopulatedDoc<T>>>;
    findOneOrFailParam(criteria?: any, select?: string, populate?: string | QueryOptions): Promise<PopulatedDoc<T>>;
    findOneOrFail(criteria?: FilterQuery<T>, options?: FindAllOptions<T>): Promise<T>;
    update1(id: string, entity: Partial<T>): Promise<T>;
    findAllAscending(sortField: keyof T, criteria?: FilterQuery<T>): Promise<T[]>;
    findAllDescending(sortField: keyof T, criteria?: FilterQuery<T>): Promise<T[]>;
    findAllWithLimit(criteria: FilterQuery<T>, limit: number, options?: FindAllOptions<T>): Promise<T[]>;
    findAllWithSkip(criteria: FilterQuery<T>, skip: number, options?: FindAllOptions<T>): Promise<T[]>;
    findAllWithSelect(criteria: FilterQuery<T>, select: any, options?: FindAllOptions<T>): Promise<T[]>;
    findAllWithPopulate(criteria: FilterQuery<T>, populate: any, options?: FindAllOptions<T>): Promise<T[]>;
}
export {};
