"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
const common_1 = require("@nestjs/common");
class GenericRepository {
    constructor(model) {
        this.model = model;
    }
    async create(entity) {
        return this.model.create(entity);
    }
    async createByKey(mainDocId, docArrayNames, subDocData, metadataFields = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }) {
        const mainDoc = await this.model.findById(mainDocId).exec();
        if (!mainDoc) {
            throw new common_1.NotFoundException('Main document not found');
        }
        let currentObj = mainDoc;
        let updatePath = '';
        for (const arrayName of docArrayNames) {
            if (!currentObj[arrayName]) {
                throw new common_1.NotFoundException(`Path not found: ${arrayName}`);
            }
            if (Array.isArray(currentObj[arrayName])) {
                currentObj[arrayName].push(subDocData);
                updatePath = docArrayNames.slice(0, docArrayNames.indexOf(arrayName) + 1).join('.');
                break;
            }
            else if (typeof currentObj[arrayName] === 'object') {
                currentObj = currentObj[arrayName];
            }
            else {
                throw new Error(`${arrayName} is not an array or an object`);
            }
        }
        if (!updatePath) {
            throw new Error(`Array ${docArrayNames[docArrayNames.length - 1]} not found or is not an array`);
        }
        mainDoc[metadataFields.lastModifiedBy] = 'editor';
        mainDoc[metadataFields.lastModifiedOn] = new Date();
        mainDoc.markModified(updatePath);
        await mainDoc.save();
        return mainDoc;
    }
    async update(criteria, update) {
        try {
            const result = await this.model.findOneAndUpdate(criteria, update, { new: true }).exec();
            if (!result) {
                throw new common_1.NotFoundException('Document not found');
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
            throw new Error(`Error updating document: ${error}`);
        }
    }
    async updateByKey(mainDocId, subDocArrayPath, subDocId, subDocData, metadataFields = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }) {
        const mainDoc = await this.model.findById(mainDocId).exec();
        if (!mainDoc) {
            throw new common_1.NotFoundException('Main document not found');
        }
        let currentObj = mainDoc;
        let parentObj = null;
        let lastKey = '';
        for (const key of subDocArrayPath) {
            if (!currentObj[key]) {
                throw new common_1.NotFoundException(`Path not found: ${key}`);
            }
            parentObj = currentObj;
            currentObj = currentObj[key];
            lastKey = key;
        }
        if (!Array.isArray(currentObj)) {
            throw new Error(`The path does not point to an array: ${subDocArrayPath.join('.')}`);
        }
        const subDocIndex = currentObj.findIndex((doc) => doc._id.toString() === subDocId);
        if (subDocIndex === -1) {
            throw new common_1.NotFoundException('Sub-document not found');
        }
        const subDoc = currentObj[subDocIndex];
        Object.assign(subDoc, subDocData);
        mainDoc[metadataFields.lastModifiedBy] = subDocData.last_modified_by || mainDoc[metadataFields.lastModifiedBy];
        mainDoc[metadataFields.lastModifiedOn] = new Date();
        parentObj[lastKey] = currentObj;
        mainDoc.markModified(subDocArrayPath.join('.'));
        return mainDoc.save();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async deleteByKey(mainDocId, docArrayNames, subDocDataId, metadataFields = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }) {
        const mainDoc = await this.model.findById(mainDocId).exec();
        if (!mainDoc) {
            throw new common_1.NotFoundException('Main document not found');
        }
        let currentObj = mainDoc;
        let updatePath = '';
        for (const arrayName of docArrayNames) {
            if (!currentObj[arrayName]) {
                throw new common_1.NotFoundException(`Path not found: ${arrayName}`);
            }
            if (Array.isArray(currentObj[arrayName])) {
                const subDocIndex = currentObj[arrayName].findIndex((item) => item._id && item._id.toString() === subDocDataId);
                if (subDocIndex !== -1) {
                    currentObj[arrayName].splice(subDocIndex, 1);
                    updatePath = docArrayNames.slice(0, docArrayNames.indexOf(arrayName) + 1).join('.');
                    break;
                }
                else {
                    throw new common_1.NotFoundException('Sub-document not found');
                }
            }
            else if (typeof currentObj[arrayName] === 'object') {
                currentObj = currentObj[arrayName];
            }
            else {
                throw new Error(`${arrayName} is not an array or an object`);
            }
        }
        if (!updatePath) {
            throw new Error(`Array ${docArrayNames[docArrayNames.length - 1]} not found or is not an array`);
        }
        mainDoc[metadataFields.lastModifiedBy] = 'editor';
        mainDoc[metadataFields.lastModifiedOn] = new Date();
        mainDoc.markModified(updatePath);
        await mainDoc.save();
        return mainDoc;
    }
    async softDelete(id) {
        return this.model.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
    }
    async softDeleteByKey(mainDocId, docArrayNames, subDocId, metadataFields = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }) {
        const mainDoc = await this.model.findById(mainDocId).exec();
        if (!mainDoc) {
            throw new common_1.NotFoundException('Main document not found');
        }
        let currentObj = mainDoc;
        docArrayNames.forEach((arrayName, index) => {
            if (!currentObj[arrayName]) {
                throw new common_1.NotFoundException(`Path not found: ${arrayName}`);
            }
            if (Array.isArray(currentObj[arrayName])) {
                const subDocIndex = currentObj[arrayName].findIndex((item) => item._id && item._id.toString() === subDocId);
                if (subDocIndex !== -1) {
                    console.log("flg:", currentObj[arrayName][subDocIndex].is_deleted);
                    currentObj[arrayName][subDocIndex].is_deleted = !currentObj[arrayName][subDocIndex].is_deleted;
                    console.log("flg1:", currentObj[arrayName][subDocIndex].is_deleted);
                    mainDoc.markModified(docArrayNames.slice(0, index + 1).join('.'));
                    return;
                }
                else {
                    throw new common_1.NotFoundException('Sub-document not found');
                }
            }
            else if (typeof currentObj[arrayName] === 'object') {
                currentObj = currentObj[arrayName];
            }
            else {
                throw new Error(`${arrayName} is not an array or an object`);
            }
        });
        mainDoc[metadataFields.lastModifiedBy] = 'Editor';
        mainDoc[metadataFields.lastModifiedOn] = new Date();
        await mainDoc.save();
        return mainDoc;
    }
    async restore(id) {
        return this.model.findByIdAndUpdate(id, { deleted: false }, { new: true }).exec();
    }
    async findAll(criteria = {}, options = {}) {
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
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async findOne(criteria = {}, options = {}) {
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
}
exports.GenericRepository = GenericRepository;
//# sourceMappingURL=generic.repository.js.map