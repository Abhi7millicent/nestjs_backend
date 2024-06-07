"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
const common_1 = require("@nestjs/common");
const error_message_1 = require("../error.handling/error.message");
class GenericRepository {
    constructor(model) {
        this.model = model;
    }
    async create(entity) {
        try {
            return await this.model.create(entity);
        }
        catch (error) {
            throw new Error(error_message_1.ErrorMessage.NOT_CREATED);
        }
    }
    async createByKey(id, keyPath, data) {
        try {
            const value = await this.model.findById(id).exec();
            if (!value) {
                throw new common_1.NotFoundException(error_message_1.ErrorMessage.ID_NOT_FOUND(id));
            }
            let currentObj = value;
            let updatePath = '';
            for (const arrayName of keyPath) {
                if (!currentObj[arrayName]) {
                    throw new common_1.NotFoundException(error_message_1.ErrorMessage.KEY_NOT_FOUND(arrayName));
                }
                if (Array.isArray(currentObj[arrayName])) {
                    currentObj[arrayName].push(data);
                    updatePath = keyPath.slice(0, keyPath.indexOf(arrayName) + 1).join('.');
                    break;
                }
                else if (typeof currentObj[arrayName] === 'object') {
                    currentObj = currentObj[arrayName];
                }
                else {
                    throw new Error(error_message_1.ErrorMessage.NOT_ARRAY_OR_OBJECT(arrayName));
                }
            }
            if (!updatePath) {
                throw new Error(error_message_1.ErrorMessage.ARRAY_NOT_FOUND(keyPath[keyPath.length - 1]));
            }
            value.markModified(updatePath);
            await value.save();
            const pushedPart = keyPath.reduce((obj, key) => obj[key], value);
            return pushedPart[pushedPart.length - 1];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error(error_message_1.ErrorMessage.NOT_FOUND, error.message);
                throw error;
            }
            else {
                console.error(error_message_1.ErrorMessage.UNEXPECTED_ERROR, error.message);
                throw error;
            }
        }
    }
    async update(criteria, update) {
        try {
            const result = await this.model.findOneAndUpdate(criteria, update, { new: true }).exec();
            if (!result) {
                throw new common_1.NotFoundException(error_message_1.ErrorMessage.NOT_FOUND);
            }
            const responseDto = {
                acknowledged: true,
                modifiedCount: 1,
                upsertedId: result._id ? result._id.toString() : null,
                upsertedCount: result ? 1 : 0,
                matchedCount: result ? 1 : 0
            };
            return { updatedData: result, ...responseDto };
        }
        catch (error) {
            throw new Error(error_message_1.ErrorMessage.NOT_UPDATED(error.message));
        }
    }
    async updateByKey(id, keyPath, subId, data) {
        try {
            const value = await this.model.findById(id).exec();
            if (!value) {
                throw new common_1.NotFoundException(error_message_1.ErrorMessage.ID_NOT_FOUND(id));
            }
            let currentObj = value;
            let parentObj = null;
            let lastKey = '';
            for (const key of keyPath) {
                if (!currentObj[key]) {
                    throw new common_1.NotFoundException(error_message_1.ErrorMessage.KEY_NOT_FOUND(key));
                }
                parentObj = currentObj;
                currentObj = currentObj[key];
                lastKey = key;
            }
            if (!Array.isArray(currentObj)) {
                throw new Error(error_message_1.ErrorMessage.ARRAY_NOT_FOUND(keyPath.join('.')));
            }
            const subDocIndex = currentObj.findIndex((doc) => doc._id.toString() === subId);
            if (subDocIndex === -1) {
                throw new common_1.NotFoundException(error_message_1.ErrorMessage.NOT_FOUND);
            }
            const updatePath = [...keyPath, subDocIndex.toString()].join('.');
            const updateObject = {
                [`${updatePath}`]: { ...currentObj[subDocIndex], ...data },
            };
            return await this.model.updateOne({ _id: id }, { $set: updateObject }).exec();
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new Error(error_message_1.ErrorMessage.NOT_UPDATED(error.message));
            }
        }
    }
    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id).exec();
        }
        catch (error) {
            throw error;
        }
    }
    async deleteByKey(id, keyPath, subId) {
        try {
            const value = await this.model.findById(id).exec();
            if (!value) {
                throw new common_1.NotFoundException(error_message_1.ErrorMessage.ID_NOT_FOUND(id));
            }
            let currentObj = value;
            let updatePath = '';
            for (const arrayName of keyPath) {
                if (!currentObj[arrayName]) {
                    throw new common_1.NotFoundException(error_message_1.ErrorMessage.KEY_NOT_FOUND(arrayName));
                }
                if (Array.isArray(currentObj[arrayName])) {
                    const subDocIndex = currentObj[arrayName].findIndex((item) => item._id && item._id.toString() === subId);
                    if (subDocIndex !== -1) {
                        currentObj[arrayName].splice(subDocIndex, 1);
                        updatePath = keyPath.slice(0, keyPath.indexOf(arrayName) + 1).join('.');
                        break;
                    }
                    else {
                        throw new common_1.NotFoundException(error_message_1.ErrorMessage.NOT_FOUND);
                    }
                }
                else if (typeof currentObj[arrayName] === 'object') {
                    currentObj = currentObj[arrayName];
                }
                else {
                    throw new Error(error_message_1.ErrorMessage.NOT_ARRAY_OR_OBJECT(arrayName));
                }
            }
            if (!updatePath) {
                throw new Error(error_message_1.ErrorMessage.ARRAY_NOT_FOUND(keyPath[keyPath.length - 1]));
            }
            value.markModified(updatePath);
            await value.save();
            return value;
        }
        catch (error) {
            throw error;
        }
    }
    async softDelete(id) {
        try {
            return await this.model.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
        }
        catch (error) {
            throw error;
        }
    }
    async softDeleteByKey(id, keyPath, subId) {
        try {
            const value = await this.model.findById(id).exec();
            if (!value) {
                throw new common_1.NotFoundException(error_message_1.ErrorMessage.ID_NOT_FOUND(id));
            }
            let currentObj = value;
            keyPath.forEach((arrayName, index) => {
                if (!currentObj[arrayName]) {
                    throw new common_1.NotFoundException(error_message_1.ErrorMessage.KEY_NOT_FOUND(arrayName));
                }
                if (Array.isArray(currentObj[arrayName])) {
                    const subDocIndex = currentObj[arrayName].findIndex((item) => item._id && item._id.toString() === subId);
                    if (subDocIndex !== -1) {
                        console.log("flg:", currentObj[arrayName][subDocIndex].is_deleted);
                        currentObj[arrayName][subDocIndex].is_deleted = !currentObj[arrayName][subDocIndex].is_deleted;
                        console.log("flg1:", currentObj[arrayName][subDocIndex].is_deleted);
                        value.markModified(keyPath.slice(0, index + 1).join('.'));
                        return;
                    }
                    else {
                        throw new common_1.NotFoundException(error_message_1.ErrorMessage.NOT_FOUND);
                    }
                }
                else if (typeof currentObj[arrayName] === 'object') {
                    currentObj = currentObj[arrayName];
                }
                else {
                    throw new Error(error_message_1.ErrorMessage.NOT_ARRAY_OR_OBJECT(arrayName));
                }
            });
            await value.save();
            return value;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(criteria = {}, options = {}) {
        try {
            let query;
            if (criteria) {
                query = this.model.find(criteria);
            }
            else {
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
            return await query.exec();
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            return this.model.findById(id).exec();
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(criteria = {}, options = {}) {
        try {
            let query;
            if (criteria) {
                query = this.model.findOne(criteria);
            }
            else {
                query = this.model.findOne();
            }
            if (options.select) {
                query = query.select(options.select);
            }
            if (options.populate) {
                query = query.populate(options.populate);
            }
            return await query.exec();
        }
        catch (error) {
            throw error;
        }
    }
    async restore(id) {
        return this.model.findByIdAndUpdate(id, { deleted: false }, { new: true }).exec();
    }
    async findAllParam(criteria = {}, sort = {}, limit, select, skip, populate) {
        try {
            let query = this.model.find(criteria);
            if (sort) {
                query = query.sort(sort);
            }
            if (limit) {
                query = query.limit(limit);
            }
            if (select) {
                query = query.select(select);
            }
            if (skip) {
                query = query.skip(skip);
            }
            if (populate) {
                query = query.populate(populate);
            }
            const results = await query.exec();
            return results;
        }
        catch (error) {
            throw new Error(`Error fetching documents: ${error}`);
        }
    }
    async findOneOrFailParam(criteria = {}, select, populate) {
        try {
            let query;
            if (criteria) {
                query = this.model.findOne(criteria);
            }
            else {
                query = this.model.findOne();
            }
            if (select) {
                query = query.select(select);
            }
            if (populate) {
                query = query.populate(populate);
            }
            const result = await query.exec();
            if (!result) {
                throw new Error('Document not found');
            }
            return result;
        }
        catch (error) {
            throw new Error(`Error fetching document: ${error}`);
        }
    }
    async findOneOrFail(criteria = {}, options = {}) {
        let query;
        if (criteria) {
            query = this.model.findOne(criteria);
        }
        else {
            query = this.model.findOne();
        }
        if (options.select) {
            query = query.select(options.select);
        }
        if (options.populate) {
            query = query.populate(options.populate);
        }
        const result = await query.exec();
        if (!result) {
            throw new Error('Document not found');
        }
        return result;
    }
    async update1(id, entity) {
        return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
    }
    async findAllAscending(sortField, criteria = {}) {
        const query = criteria ? this.model.find(criteria) : this.model.find();
        const sortConfig = { [sortField]: 1 };
        query.sort(sortConfig);
        return query.exec();
    }
    async findAllDescending(sortField, criteria = {}) {
        const query = criteria ? this.model.find(criteria) : this.model.find();
        const sortConfig = { [sortField]: -1 };
        query.sort(sortConfig);
        return query.exec();
    }
    async findAllWithLimit(criteria = {}, limit, options = {}) {
        options.limit = limit;
        return this.findAll(criteria, options);
    }
    async findAllWithSkip(criteria = {}, skip, options = {}) {
        options.skip = skip;
        return this.findAll(criteria, options);
    }
    async findAllWithSelect(criteria = {}, select, options = {}) {
        options.select = select;
        return this.findAll(criteria, options);
    }
    async findAllWithPopulate(criteria = {}, populate, options = {}) {
        options.populate = populate;
        return this.findAll(criteria, options);
    }
}
exports.GenericRepository = GenericRepository;
//# sourceMappingURL=generic.repository.js.map