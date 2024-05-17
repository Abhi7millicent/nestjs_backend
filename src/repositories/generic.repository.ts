import { Model, FilterQuery, QueryOptions } from 'mongoose';

interface FindAllOptions<T> extends QueryOptions {
    sort?: any;
    limit?: number;
    skip?: number;
    select?: any;
    populate?: any;
}

export abstract class GenericRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    async create(entity: Partial<T>): Promise<T> {
        return this.model.create(entity);
    }

    // async findAll(): Promise<T[]> {
    //     return this.model.find().exec();
    // }

    async findAll(criteria: FilterQuery<T> = {}, options: FindAllOptions<T> = {}): Promise<T[]> {
        let query: any;

        if (criteria){
            query = this.model.find(criteria);
        }else{
            query = this.model.find();
        }
        if (options.sort) {
            query = query.sort(options.sort);
        }
        if (options.limit !== undefined) {
            query = query.limit(options.limit);
        }
        if (options.skip !== undefined) {
            query = query.skip(options.skip);
        }
        if (options.select) {
            query = query.select(options.select);
        }
        if (options.populate) {
            query = query.populate(options.populate);
        }

        return query.exec();
    }

    // async findAllBy(criteria: FilterQuery<T> = {}): Promise<T[]> {
    //     return this.model.find(criteria).exec();
    // }

    async findById(id: string): Promise<T> {
        return this.model.findById(id).exec();
    }

    async findOne(criteria: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(criteria).exec();
    }

    async update(id: string, entity: Partial<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
    }

    async delete(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
