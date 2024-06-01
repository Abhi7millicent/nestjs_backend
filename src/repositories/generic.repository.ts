import { NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, QueryOptions, PopulatedDoc } from 'mongoose';
import { updateResponseDto } from 'src/dto/update.response.dto';

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

    async createByKey(
      mainDocId: string,
      docArrayNames: string[],
      subDocData: any,
      metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
    ): Promise<any> {
      const mainDoc = await this.model.findById(mainDocId).exec();
      if (!mainDoc) {
        throw new NotFoundException('Main document not found');
      }
    
      let currentObj = mainDoc;
      let updatePath = '';
    
      for (const arrayName of docArrayNames) {
        if (!currentObj[arrayName]) {
          throw new NotFoundException(`Path not found: ${arrayName}`);
        }
        if (Array.isArray(currentObj[arrayName])) {
          currentObj[arrayName].push(subDocData);
          updatePath = docArrayNames.slice(0, docArrayNames.indexOf(arrayName) + 1).join('.');
          break;
        } else if (typeof currentObj[arrayName] === 'object') {
          currentObj = currentObj[arrayName];
        } else {
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

    async update(criteria: FilterQuery<T>, update: Partial<T>): Promise<updateResponseDto & { updatedData: T }> {
      try {
        const result = await this.model.findOneAndUpdate(criteria, update, { new: true }).exec();
    
        if (!result) {
          throw new NotFoundException('Document not found');
        }
    
        const responseDto: updateResponseDto = {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: result._id ? result._id.toString() : null,
          upsertedCount: result ? 1 : 0,
          matchedCount: result ? 1 : 0
        };
        // console.log("data:", { updatedData: result, ...responseDto } )
        return { updatedData: result, ...responseDto };
      } catch (error) {
        throw new Error(`Error updating document: ${error}`);
      }
    }
    

    // async update(criteria: FilterQuery<T>, update: Partial<T>): Promise<updateResponseDto> {
    //   try {
    //       const result = await this.model.updateOne(criteria, update).exec();
  
    //       const responseDto: updateResponseDto = {
    //           acknowledged: result.acknowledged,
    //           modifiedCount: result.modifiedCount,
    //           upsertedId: result.upsertedId ? result.upsertedId.toString() : null,
    //           upsertedCount: result.upsertedCount || 0,
    //           matchedCount: result.matchedCount
    //       };
  
    //       return responseDto;
    //   } catch (error) {
    //       throw new Error(`Error updating document: ${error}`);
    //   }
    // }

    async updateByKey(
      mainDocId: string,
      subDocArrayPath: string[],
      subDocId: string,
      subDocData: any,
      metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
    ): Promise<any> {
      const mainDoc = await this.model.findById(mainDocId).exec();
      if (!mainDoc) {
        throw new NotFoundException('Main document not found');
      }
    
      let currentObj = mainDoc;
      let parentObj = null;
      let lastKey = '';
    
      // Traverse the path to find the sub-document array
      for (const key of subDocArrayPath) {
        if (!currentObj[key]) {
          throw new NotFoundException(`Path not found: ${key}`);
        }
        parentObj = currentObj;
        currentObj = currentObj[key];
        lastKey = key;
      }
    
      if (!Array.isArray(currentObj)) {
        throw new Error(`The path does not point to an array: ${subDocArrayPath.join('.')}`);
      }
    
      const subDocIndex = currentObj.findIndex((doc: any) => doc._id.toString() === subDocId);
      if (subDocIndex === -1) {
        throw new NotFoundException('Sub-document not found');
      }
    
      // Update the sub-document
      const subDoc = currentObj[subDocIndex];
      Object.assign(subDoc, subDocData);
    
     

    mainDoc[metadataFields.lastModifiedBy] = subDocData.last_modified_by || mainDoc[metadataFields.lastModifiedBy];
    mainDoc[metadataFields.lastModifiedOn] = new Date();
    
      parentObj[lastKey] = currentObj; // Ensure the modified array is set back in its parent object
      mainDoc.markModified(subDocArrayPath.join('.')); // Mark the modified path
    
      // Save the main document
      return mainDoc.save();
    }

    async delete(id: string): Promise<T> {
      return this.model.findByIdAndDelete(id).exec();
    }

    async deleteByKey(
      mainDocId: string,
      docArrayNames: string[],
      subDocDataId: string,
      metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
    ): Promise<any> {
      const mainDoc = await this.model.findById(mainDocId).exec();
      if (!mainDoc) {
        throw new NotFoundException('Main document not found');
      }
    
      let currentObj = mainDoc;
      let updatePath = '';
    
      for (const arrayName of docArrayNames) {
        if (!currentObj[arrayName]) {
          throw new NotFoundException(`Path not found: ${arrayName}`);
        }
        if (Array.isArray(currentObj[arrayName])) {
          const subDocIndex = currentObj[arrayName].findIndex((item: any) => item._id && item._id.toString() === subDocDataId);
          if (subDocIndex !== -1) {
            currentObj[arrayName].splice(subDocIndex, 1); 
            updatePath = docArrayNames.slice(0, docArrayNames.indexOf(arrayName) + 1).join('.');
            break;
          } else {
            throw new NotFoundException('Sub-document not found');
          }
        } else if (typeof currentObj[arrayName] === 'object') {
          currentObj = currentObj[arrayName];
        } else {
          throw new Error(`${arrayName} is not an array or an object`);
        }
      }
    
      if (!updatePath) {
        throw new Error(`Array ${docArrayNames[docArrayNames.length - 1]} not found or is not an array`);
      }
    
      // Update metadata fields
      mainDoc[metadataFields.lastModifiedBy] = 'editor'; 
      mainDoc[metadataFields.lastModifiedOn] = new Date();
    
      mainDoc.markModified(updatePath);
    
      await mainDoc.save();
    
      return mainDoc;
    }

    async softDelete(id: string): Promise<T> {
      return this.model.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
    }

    async softDeleteByKey(
      mainDocId: string,
      docArrayNames: string[],
      subDocId: string,
      metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
    ): Promise<any> {
      const mainDoc = await this.model.findById(mainDocId).exec();
      if (!mainDoc) {
        throw new NotFoundException('Main document not found');
      }
    
      let currentObj = mainDoc;
    
      docArrayNames.forEach((arrayName, index) => {
        if (!currentObj[arrayName]) {
          throw new NotFoundException(`Path not found: ${arrayName}`);
        }
        if (Array.isArray(currentObj[arrayName])) {
          const subDocIndex = currentObj[arrayName].findIndex((item: any) => item._id && item._id.toString() === subDocId);
          if (subDocIndex !== -1) {
            console.log("flg:",currentObj[arrayName][subDocIndex].is_deleted);
            currentObj[arrayName][subDocIndex].is_deleted = !currentObj[arrayName][subDocIndex].is_deleted;
            console.log("flg1:",currentObj[arrayName][subDocIndex].is_deleted);
            mainDoc.markModified(docArrayNames.slice(0, index + 1).join('.'));
            return;
          } else {
            throw new NotFoundException('Sub-document not found');
          }
        } else if (typeof currentObj[arrayName] === 'object') {
          currentObj = currentObj[arrayName];
        } else {
          throw new Error(`${arrayName} is not an array or an object`);
        }
      });
    
      mainDoc[metadataFields.lastModifiedBy] = 'Editor'; 
      mainDoc[metadataFields.lastModifiedOn] = new Date();
    
      await mainDoc.save();
    
      return mainDoc;
    }

    async restore(id: string): Promise<T> {
      return this.model.findByIdAndUpdate(id, { deleted: false }, { new: true }).exec();
    }

    async findAll(criteria: FilterQuery<T> = {}, options: FindAllOptions<T> = {}): Promise<T[]> {
        let query: any;

        if (criteria) {
            query = this.model.find(criteria);
        } else {
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
        return await query.exec(); // Ensure await is used here
    }

    async findById(id: string): Promise<T> {
        return this.model.findById(id).exec();
    }

    // async findOne(criteria: FilterQuery<T>): Promise<T | null> {
    //     return this.model.findOne(criteria).exec();
    // }

    async findOne(criteria: FilterQuery<T> = {}, options: FindAllOptions<T> = {}): Promise<T | null> {
        let query: any;
    
        if (criteria) {
            query = this.model.findOne(criteria);
        } else {
            query = this.model.findOne();
        }
    
        if (options.select) {
            query = query.select(options.select);
        }
        if (options.populate) {
            query = query.populate(options.populate);
        }
        return await query.exec(); // Ensure await is used here
    }

    async findOneOrFail(criteria: FilterQuery<T> = {}, options: FindAllOptions<T> = {}): Promise<T> {
        let query: any;
    
        if (criteria) {
            query = this.model.findOne(criteria);
        } else {
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
    

    async update1(id: string, entity: Partial<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
    }

    

    async findAllAscending(sortField: keyof T, criteria: FilterQuery<T> = {}): Promise<T[]> {
        const query = criteria ? this.model.find(criteria) : this.model.find();
        const sortConfig = { [sortField]: 1 }; 
        query.sort(sortConfig);
        return query.exec();
      }
    
      async findAllDescending(sortField: keyof T, criteria: FilterQuery<T> = {}): Promise<T[]> {
        const query = criteria ? this.model.find(criteria) : this.model.find();
        const sortConfig = { [sortField]: -1 }; 
        query.sort(sortConfig);
        return query.exec();
      }

    async findAllWithLimit(criteria: FilterQuery<T> = {}, limit: number, options: FindAllOptions<T> = {}): Promise<T[]> {
        // criteria = { ...criteria, deleted: false };
        options.limit = limit; // Set limit
        return this.findAll(criteria, options); // Correctly calls findAll with options
    }

    async findAllWithSkip(criteria: FilterQuery<T> = {}, skip: number, options: FindAllOptions<T> = {}): Promise<T[]> {
        options.skip = skip; // Set skip
        return this.findAll(criteria, options); // Correctly calls findAll with options
    }

    async findAllWithSelect(criteria: FilterQuery<T> = {}, select: any, options: FindAllOptions<T> = {}): Promise<T[]> {
        options.select = select; // Set select
        return this.findAll(criteria, options); // Correctly calls findAll with options
    }

    async findAllWithPopulate(criteria: FilterQuery<T> = {}, populate: any, options: FindAllOptions<T> = {}): Promise<T[]> {
        options.populate = populate; // Set populate
        return this.findAll(criteria, options); // Correctly calls findAll with options
    }

    async findAllParam(
        criteria: any = {},
        sort: any = {},
        limit?: number,
        select?: string,
        skip?: number,
        populate?: string | QueryOptions
      ): Promise<Array<PopulatedDoc<T>>> {
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
        } catch (error) {
          throw new Error(`Error fetching documents: ${error}`);
        }
    }

    async findOneOrFailParam(
        criteria: any = {},
        select?: string,
        populate?: string | QueryOptions
      ): Promise<PopulatedDoc<T>> {
        try {
          let query: any;
    
          if (criteria) {
            query = this.model.findOne(criteria);
          } else {
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
        } catch (error) {
          throw new Error(`Error fetching document: ${error}`);
        }
      }

      // async softDeleteByKey(
      //   mainDocId: string,
      //   subDocArrayName: string,
      //   subDocId: string,
      //   metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
      // ): Promise<any> {
      //   const mainDoc = await this.model.findById(mainDocId).exec();
      //   if (!mainDoc) {
      //     throw new NotFoundException('Main document not found');
      //   }
        
      //   const data = mainDoc[subDocArrayName];
      
      //   let subDoc = null;
      
      //   const findSubDoc = (data: any) => {
      //     if (Array.isArray(data)) {
      //       for (const item of data) {
      //         if (item._id && item._id.toString() === subDocId) {
      //           return item;
      //         }
      //         const result = findSubDoc(item);
      //         if (result) return result;
      //       }
      //     } else if (typeof data === 'object' && data !== null) {
      //       for (const key in data) {
      //         const result = findSubDoc(data[key]);
      //         if (result) return result;
      //       }
      //     }
      //     return null;
      //   };
      
      //   subDoc = findSubDoc(data);
      
      //   if (!subDoc) {
      //     throw new NotFoundException('Sub-document not found');
      //   }
      
      //   subDoc.is_deleted = !subDoc.is_deleted;
      
      //   mainDoc.markModified(subDocArrayName);
      
      //   mainDoc[metadataFields.lastModifiedOn] = new Date();
      
      //   await mainDoc.save();
      
      //   return subDoc;
      // }
    
    
    
   

   
   

    // async addSubDocument(
    //     mainDocId: string,
    //     subDocArrayName: string,
    //     subDocData: any,
    //     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
    // ): Promise<any> {
    //     const mainDoc = await this.model.findById(mainDocId).exec();
    //     if (!mainDoc) {
    //         throw new NotFoundException('Main document not found');
    //     }
    //     mainDoc[subDocArrayName].push(subDocData);
    //     mainDoc.markModified(subDocArrayName);
    //     mainDoc[metadataFields.lastModifiedBy] = "Editor";
    //     mainDoc[metadataFields.lastModifiedOn] = new Date();
    //     return mainDoc.save();
    // };
    
   
    
    
  //   async updateSubDocument(
  //     mainDocId: string,
  //     subDocArrayName: string,
  //     subDocId: string,
  //     subDocData: any,
  //     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
  // ): Promise<any> {
  //     const mainDoc = await this.model.findById(mainDocId).exec();
  //     if (!mainDoc) {
  //         throw new NotFoundException('Main document not found');
  //     }

  //     const subDoc = mainDoc[subDocArrayName].find((doc: any) => doc._id.toString() === subDocId);
  //     if (!subDoc) {
  //         throw new NotFoundException('Sub-document not found');
  //     }

  //     Object.keys(subDocData).forEach((key) => {
  //         subDoc[key] = subDocData[key];
  //     });

  //     mainDoc.markModified(subDocArrayName);

  //     mainDoc[metadataFields.lastModifiedBy] = subDocData.last_modified_by || mainDoc[metadataFields.lastModifiedBy];
  //     mainDoc[metadataFields.lastModifiedOn] = new Date();

  //     await mainDoc.save();

  //     return mainDoc[subDocArrayName].find((doc: any) => doc._id.toString() === subDocId);
  // }

  // async addSubSubDocument(
  //   mainDocId: string,
  //   subDocArrayName: string,
  //   subDocArrayName1: string,
  //   subDocData: any,
  //   metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
  //   ): Promise<any> {
  //   const mainDoc = await this.model.findById(mainDocId).exec();
  //   if (!mainDoc) {
  //       throw new NotFoundException('Main document not found');
  //   }
  //   mainDoc[subDocArrayName][subDocArrayName1].push(subDocData);
  //   mainDoc.markModified(subDocArrayName);
  //   mainDoc[metadataFields.lastModifiedBy] = 'Editor';
  //   mainDoc[metadataFields.lastModifiedOn] = new Date();
    
  //   return mainDoc.save();
  // };


//   async updateSubSubDocument(
//     mainDocId: string,
//     subDocArrayName: string,
//     subDocArrayName1: string,
//     subDocId: string,
//     subDocData: any,
//     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//  ): Promise<any> {
//     const mainDoc = await this.model.findById(mainDocId).exec();
//     if (!mainDoc) {
//         throw new NotFoundException('Main document not found');
//     }
//     const subDocArrayObj = mainDoc[subDocArrayName];
//     const subDoc = subDocArrayObj[subDocArrayName1].find((doc: any) => doc._id.toString() === subDocId);
//     if (!subDoc) {
//         throw new NotFoundException('Sub-document not found');
//     }
//     Object.keys(subDocData).forEach((key) => {
//         subDoc[key] = subDocData[key];
//     });

//     mainDoc.markModified(subDocArrayName);

//     mainDoc[metadataFields.lastModifiedBy] = subDocData.last_modified_by || mainDoc[metadataFields.lastModifiedBy];
//     mainDoc[metadataFields.lastModifiedOn] = new Date();

//     await mainDoc.save();
//     const data = mainDoc[subDocArrayName];
//     return data[subDocArrayName1].find((doc: any) => doc._id.toString() === subDocId);
// }
    
// async updateSubSubDocumentDeleteFlag(
//     mainDocId: string,
//     subDocArrayName: string,
//     subDocArrayName1: string,
//     subDocId: string,
//     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//   ): Promise<any> {
//     const mainDoc = await this.model.findById(mainDocId).exec();
//     if (!mainDoc) {
//         throw new NotFoundException('Main document not found');
//     }
  
//     const subDocArrayObj = mainDoc[subDocArrayName];
//     const subDoc = subDocArrayObj[subDocArrayName1].find((doc: any) => doc._id.toString() === subDocId);
//     if (!subDoc) {
//         throw new NotFoundException('Sub-document not found');
//     }
  
//     subDoc.is_deleted = !subDoc.is_deleted;
  
//     mainDoc.markModified(subDocArrayName);

//     mainDoc[metadataFields.lastModifiedOn] = new Date();

//     await mainDoc.save();
  
//     const data = mainDoc[subDocArrayName];
//     return data[subDocArrayName1].find((doc: any) => doc._id.toString() === subDocId);
// }




// async updateSubDocumentDeleteFlag(
//     mainDocId: string,
//     subDocArrayName: string,
//     subDocId: string,
//     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//   ): Promise<any> {
//     const mainDoc = await this.model.findById(mainDocId).exec();
//     if (!mainDoc) {
//       throw new NotFoundException('Main document not found');
//     }
  
//     const data = mainDoc[subDocArrayName];
    
//     console.log("data:", data);
  
//     let subDoc = null;
  
//     if (Array.isArray(data)) {
//       subDoc = data.find((doc: any) => doc._id.toString() === subDocId);
//     }
  
//     if (!subDoc) {
//       const keys = Object.keys(data);
  
//       for (const key of keys) {
//         const arrayOrObject = data[key];
//         if (Array.isArray(arrayOrObject)) {
//           for (const doc of arrayOrObject) {
//             if (doc._id.toString() === subDocId) {
//               subDoc = doc;
//               break;
//             }
//           }
//         } else if (typeof arrayOrObject === 'object' && arrayOrObject !== null) {
//           const nestedKeys = Object.keys(arrayOrObject);
//           for (const nestedKey of nestedKeys) {
//             const nestedArray = arrayOrObject[nestedKey];
//             if (Array.isArray(nestedArray)) {
//               for (const doc of nestedArray) {
//                 if (doc._id.toString() === subDocId) {
//                   subDoc = doc;
//                   break;
//                 }
//               }
//             }
//             if (subDoc) break;
//           }
//         }
  
//         if (subDoc) break;
//       }
//     }
  
//     if (!subDoc) {
//       throw new NotFoundException('Sub-document not found');
//     }
  
//     subDoc.is_deleted = !subDoc.is_deleted;
  
//     mainDoc.markModified(subDocArrayName);
  
//     mainDoc[metadataFields.lastModifiedOn] = new Date();
  
//     await mainDoc.save();
  
//     return subDoc;
//   }
  
  
  
//   async updateSubDocumentDeleteFlag(
//       mainDocId: string,
//       subDocArrayName: string,
//       subDocId: string,
//       metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//     ): Promise<any> {
//       const mainDoc = await this.model.findById(mainDocId).exec();
//       if (!mainDoc) {
//           throw new NotFoundException('Main document not found');
//       }
      
//       const data = mainDoc[subDocArrayName];
//       console.log("data:", data);
//       const subDoc = mainDoc[subDocArrayName].find((doc: any) => doc._id.toString() === subDocId);
//       if (!subDoc) {
//           throw new NotFoundException('Sub-document not found');
//       }
    
//       subDoc.is_deleted = !subDoc.is_deleted;
    
//       mainDoc.markModified(subDocArrayName);

//       mainDoc[metadataFields.lastModifiedOn] = new Date();

//       await mainDoc.save();
    
//       return mainDoc[subDocArrayName].find((doc: any) => doc._id.toString() === subDocId);
//   }
}
