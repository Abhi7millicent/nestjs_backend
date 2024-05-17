import { Model } from 'mongoose';

export abstract class GenericRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    async create(entity: Partial<T>): Promise<T> {
        return this.model.create(entity);
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<T> {
        return this.model.findById(id).exec();
    }

    async update(id: string, entity: Partial<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
    }

    async delete(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
