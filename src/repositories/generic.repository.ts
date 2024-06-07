import { NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, QueryOptions, PopulatedDoc } from 'mongoose';
import { updateResponseDto } from 'src/dto/update.response.dto';
import { ErrorMessage } from 'src/error.handling/error.message';

interface FindAllOptions<T> extends QueryOptions {
    sort?: any;
    limit?: number;
    skip?: number;
    select?: any;
    populate?: any;
}

export abstract class GenericRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    /**
     * The async create method adds a new document to a MongoDB database using Mongoose. Here’s a concise description of its functionality:
     * @param entity  Takes a partial document (entity) containing the data to be created.
     * @returns 
     */
    async create(entity: Partial<T>): Promise<T> {
      try {
          return await this.model.create(entity);
      } catch (error) {
          throw new Error(ErrorMessage.NOT_CREATED);
      }
    }
  

    /**
     * The createByKey function is an asynchronous method designed to update a nested array within a MongoDB document using Mongoose. It performs the following tasks: This function allows dynamic and flexible updates to deeply nested arrays within documents.
     * @param id : processId 
     * @param keyPath : path to insert data
     * @param data : data to update
     * @returns 
     */
    async createByKey(
      id: string,
      keyPath: string[],
      data: any,
    ): Promise<any> {
      try {
          const value = await this.model.findById(id).exec();
          if (!value) {
              throw new NotFoundException(ErrorMessage.ID_NOT_FOUND(id));
          }
          
          let currentObj = value;
          let updatePath = '';
          
          for (const arrayName of keyPath) {
              if (!currentObj[arrayName]) {
                  throw new NotFoundException(ErrorMessage.KEY_NOT_FOUND(arrayName));
              }
              if (Array.isArray(currentObj[arrayName])) {
                  currentObj[arrayName].push(data);
                  updatePath = keyPath.slice(0, keyPath.indexOf(arrayName) + 1).join('.');
                  break;
              } else if (typeof currentObj[arrayName] === 'object') {
                  currentObj = currentObj[arrayName];
              } else {
                  throw new Error(ErrorMessage.NOT_ARRAY_OR_OBJECT(arrayName));
              }
          }
          
          if (!updatePath) {
              throw new Error(ErrorMessage.ARRAY_NOT_FOUND(keyPath[keyPath.length - 1]));
          }
          
          value.markModified(updatePath);
          await value.save();
          
          const pushedPart = keyPath.reduce((obj, key) => obj[key], value);
          
          return pushedPart[pushedPart.length - 1];
      } catch (error) {
          if (error instanceof NotFoundException) {
              console.error(ErrorMessage.NOT_FOUND, error.message);
              throw error; 
          } else {
              console.error(ErrorMessage.UNEXPECTED_ERROR, error.message);
              throw error; 
          }
      }
    }
  

    /**
     * The update function is an asynchronous method that updates a document in a MongoDB collection based on provided criteria. Here's a summary:
     * @param criteria : Specifies the filter for identifying the document(s) to update.
     * @param update : Contains the partial data to update in the document.
     * @returns 
     */
    async update(criteria: FilterQuery<T>, update: Partial<T>): Promise<updateResponseDto & { updatedData: T }> {
      try {
        const result = await this.model.findOneAndUpdate(criteria, update, { new: true }).exec();
    
        if (!result) {
          throw new NotFoundException(ErrorMessage.NOT_FOUND);
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
        throw new Error(ErrorMessage.NOT_UPDATED(error.message));
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
    

    /** This async updateByKey method updates a sub-document within a nested document structure in a MongoDB database using Mongoose. Here’s a concise breakdown of its functionality:
     * @param id : proccessId 
     * @param keyPath : document path
     * @param subId :  id to update 
     * @param data : updated data
     * @returns 
    */
    async updateByKey(
      id: string,
      keyPath: string[],
      subId: string,
      data: any,
    ): Promise<any> {
      try {
        const value = await this.model.findById(id).exec();
        if (!value) {
          throw new NotFoundException(ErrorMessage.ID_NOT_FOUND(id));
        }
      
        let currentObj: any = value;
        let parentObj: any = null;
        let lastKey: string = '';
      
        for (const key of keyPath) {
          if (!currentObj[key]) {
            throw new NotFoundException(ErrorMessage.KEY_NOT_FOUND(key));
          }
          parentObj = currentObj;
          currentObj = currentObj[key];
          lastKey = key;
        }
      
        if (!Array.isArray(currentObj)) {
          throw new Error(ErrorMessage.ARRAY_NOT_FOUND(keyPath.join('.')));
        }
      
        const subDocIndex = currentObj.findIndex((doc: any) => doc._id.toString() === subId);
        if (subDocIndex === -1) {
          throw new NotFoundException(ErrorMessage.NOT_FOUND);
        }
      
        const updatePath = [...keyPath, subDocIndex.toString()].join('.');
        const updateObject = {
          [`${updatePath}`]: { ...currentObj[subDocIndex], ...data },
        };
      
        return await this.model.updateOne({ _id: id }, { $set: updateObject as any}).exec();
      
        // Optionally, you can return the updated document here
        // const updatedValue = await this.model.findById(id).exec();
        // return updatedValue;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        } else {
          throw new Error(ErrorMessage.NOT_UPDATED(error.message));
        }
      }
    }
    
    

    /**
     * The async delete method deletes a document from a MongoDB database using Mongoose. Here’s a concise description of its functionality:
     * @param id processId
     * @returns 
     */
    async delete(id: string): Promise<T> {
      try {
        return await this.model.findByIdAndDelete(id).exec();
      } catch (error) {
        throw error; 
      }
    }

    /**
     * The async deleteByKey method removes a sub-document from a nested array within a main document in a MongoDB database using Mongoose. Here’s a concise breakdown of its functionality:
     * @param id : processId 
     * @param keyPath : path to insert data
     * @param subId : id of array to delete the data
     * @param metadataFields : modified field to update
     * @returns 
     */
    async deleteByKey(
      id: string,
      keyPath: string[],
      subId: string,
    ): Promise<any> {
      try {
        const value = await this.model.findById(id).exec();
        if (!value) {
          throw new NotFoundException(ErrorMessage.ID_NOT_FOUND(id));
        }
      
        let currentObj = value;
        let updatePath = '';
      
        for (const arrayName of keyPath) {
          if (!currentObj[arrayName]) {
            throw new NotFoundException(ErrorMessage.KEY_NOT_FOUND(arrayName));
          }
          if (Array.isArray(currentObj[arrayName])) {
            const subDocIndex = currentObj[arrayName].findIndex((item: any) => item._id && item._id.toString() === subId);
            if (subDocIndex !== -1) {
              currentObj[arrayName].splice(subDocIndex, 1); 
              updatePath = keyPath.slice(0, keyPath.indexOf(arrayName) + 1).join('.');
              break;
            } else {
              throw new NotFoundException(ErrorMessage.NOT_FOUND);
            }
          } else if (typeof currentObj[arrayName] === 'object') {
            currentObj = currentObj[arrayName];
          } else {
            throw new Error(ErrorMessage.NOT_ARRAY_OR_OBJECT(arrayName));
          }
        }
      
        if (!updatePath) {
          throw new Error(ErrorMessage.ARRAY_NOT_FOUND(keyPath[keyPath.length - 1]));
        }
      
        value.markModified(updatePath);
      
        await value.save();
      
        return value;
      } catch (error) {
        throw error; 
      }
    }
    

    /**
     * The async softDelete method marks a document as deleted in a MongoDB database using Mongoose without actually removing it. Here’s a concise description of its functionality:
     * @param id : processId
     * @returns 
     */
    async softDelete(id: string): Promise<T> {
      try {
        return await this.model.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
      } catch (error) {
        // console.error(ErrorMessage.NOT_UPDATED(error.message));
        throw error;
      }
    }
    

    /**
     * The async softDeleteByKey method toggles the is_deleted status of a sub-document within a nested array in a main document in a MongoDB database using Mongoose. Here’s a concise description of its functionality:
     * @param id : processId
     * @param keyPath : path to insert data
     * @param subId : id of array to update the delete flag 
     * @returns 
     */
    async softDeleteByKey(
      id: string,
      keyPath: string[],
      subId: string,
    ): Promise<any> {
      try {
        const value = await this.model.findById(id).exec();
        if (!value) {
          throw new NotFoundException(ErrorMessage.ID_NOT_FOUND(id));
        }
    
        let currentObj = value;
    
        keyPath.forEach((arrayName, index) => {
          if (!currentObj[arrayName]) {
            throw new NotFoundException(ErrorMessage.KEY_NOT_FOUND(arrayName));
          }
          if (Array.isArray(currentObj[arrayName])) {
            const subDocIndex = currentObj[arrayName].findIndex((item: any) => item._id && item._id.toString() === subId);
            if (subDocIndex !== -1) {
              console.log("flg:", currentObj[arrayName][subDocIndex].is_deleted);
              currentObj[arrayName][subDocIndex].is_deleted = !currentObj[arrayName][subDocIndex].is_deleted;
              console.log("flg1:", currentObj[arrayName][subDocIndex].is_deleted);
              value.markModified(keyPath.slice(0, index + 1).join('.'));
              return;
            } else {
              throw new NotFoundException(ErrorMessage.NOT_FOUND);
            }
          } else if (typeof currentObj[arrayName] === 'object') {
            currentObj = currentObj[arrayName];
          } else {
            throw new Error(ErrorMessage.NOT_ARRAY_OR_OBJECT(arrayName));
          }
        });
    
    
        await value.save();
    
        return value;
      } catch (error) {
        throw error; 
      }
    }
    

    /**
     * The async findAll method retrieves documents from a MongoDB database using Mongoose, based on optional criteria and query options. Here’s a concise description of its functionality:
     * @param criteria : Optional filter criteria to find documents.
     * @param options : Optional query options to sort, limit, skip, select, and populate fields.
     * @returns 
     */
    async findAll(criteria: FilterQuery<T> = {}, options: FindAllOptions<T> = {}): Promise<T[]> {
      try {
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
        return await query.exec(); 
      } catch (error) {
        throw error; 
      }
    }
    

    /**
     * The async findById method retrieves a single document from a MongoDB database using Mongoose by its id. Here’s a concise description of its functionality:
     * @param id 
     * @returns 
     */
    async findById(id: string): Promise<T> {
      try{
        return this.model.findById(id).exec();
      } catch (error) {
        throw error; 
      }
    }

    /**
     * The async findOne method retrieves a single document from a MongoDB database using Mongoose based on optional criteria and query options. Here’s a concise description of its functionality:
     * @param criteria : Optional filter criteria to find documents.
     * @param options : Optional query options to select, and populate fields.
     * @returns 
     */
    async findOne(criteria: FilterQuery<T> = {}, options: FindAllOptions<T> = {}): Promise<T | null> {
      try{
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
      return await query.exec(); 
      } catch (error) {
        throw error; 
      }
      
  }

    async restore(id: string): Promise<T> {
      return this.model.findByIdAndUpdate(id, { deleted: false }, { new: true }).exec();
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



      // async softDeleteByKey(
      //   id: string,
      //   subDocArrayName: string,
      //   subId: string,
      //   metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
      // ): Promise<any> {
      //   const value = await this.model.findById(id).exec();
      //   if (!value) {
      //     throw new NotFoundException('Main document not found');
      //   }
        
      //   const data = value[subDocArrayName];
      
      //   let subDoc = null;
      
      //   const findSubDoc = (data: any) => {
      //     if (Array.isArray(data)) {
      //       for (const item of data) {
      //         if (item._id && item._id.toString() === subId) {
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
      
      //   value.markModified(subDocArrayName);
      
      //   value[metadataFields.lastModifiedOn] = new Date();
      
      //   await value.save();
      
      //   return subDoc;
      // }
    
    
    
   

   
   

    // async addSubDocument(
    //     id: string,
    //     subDocArrayName: string,
    //     data: any,
    //     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
    // ): Promise<any> {
    //     const value = await this.model.findById(id).exec();
    //     if (!value) {
    //         throw new NotFoundException('Main document not found');
    //     }
    //     value[subDocArrayName].push(data);
    //     value.markModified(subDocArrayName);
    //     value[metadataFields.lastModifiedBy] = "Editor";
    //     value[metadataFields.lastModifiedOn] = new Date();
    //     return value.save();
    // };
    
   
    
    
  //   async updateSubDocument(
  //     id: string,
  //     subDocArrayName: string,
  //     subId: string,
  //     data: any,
  //     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
  // ): Promise<any> {
  //     const value = await this.model.findById(id).exec();
  //     if (!value) {
  //         throw new NotFoundException('Main document not found');
  //     }

  //     const subDoc = value[subDocArrayName].find((doc: any) => doc._id.toString() === subId);
  //     if (!subDoc) {
  //         throw new NotFoundException('Sub-document not found');
  //     }

  //     Object.keys(data).forEach((key) => {
  //         subDoc[key] = data[key];
  //     });

  //     value.markModified(subDocArrayName);

  //     value[metadataFields.lastModifiedBy] = data.last_modified_by || value[metadataFields.lastModifiedBy];
  //     value[metadataFields.lastModifiedOn] = new Date();

  //     await value.save();

  //     return value[subDocArrayName].find((doc: any) => doc._id.toString() === subId);
  // }

  // async addSubSubDocument(
  //   id: string,
  //   subDocArrayName: string,
  //   subDocArrayName1: string,
  //   data: any,
  //   metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
  //   ): Promise<any> {
  //   const value = await this.model.findById(id).exec();
  //   if (!value) {
  //       throw new NotFoundException('Main document not found');
  //   }
  //   value[subDocArrayName][subDocArrayName1].push(data);
  //   value.markModified(subDocArrayName);
  //   value[metadataFields.lastModifiedBy] = 'Editor';
  //   value[metadataFields.lastModifiedOn] = new Date();
    
  //   return value.save();
  // };


//   async updateSubSubDocument(
//     id: string,
//     subDocArrayName: string,
//     subDocArrayName1: string,
//     subId: string,
//     data: any,
//     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//  ): Promise<any> {
//     const value = await this.model.findById(id).exec();
//     if (!value) {
//         throw new NotFoundException('Main document not found');
//     }
//     const subDocArrayObj = value[subDocArrayName];
//     const subDoc = subDocArrayObj[subDocArrayName1].find((doc: any) => doc._id.toString() === subId);
//     if (!subDoc) {
//         throw new NotFoundException('Sub-document not found');
//     }
//     Object.keys(data).forEach((key) => {
//         subDoc[key] = data[key];
//     });

//     value.markModified(subDocArrayName);

//     value[metadataFields.lastModifiedBy] = data.last_modified_by || value[metadataFields.lastModifiedBy];
//     value[metadataFields.lastModifiedOn] = new Date();

//     await value.save();
//     const data = value[subDocArrayName];
//     return data[subDocArrayName1].find((doc: any) => doc._id.toString() === subId);
// }
    
// async updateSubSubDocumentDeleteFlag(
//     id: string,
//     subDocArrayName: string,
//     subDocArrayName1: string,
//     subId: string,
//     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//   ): Promise<any> {
//     const value = await this.model.findById(id).exec();
//     if (!value) {
//         throw new NotFoundException('Main document not found');
//     }
  
//     const subDocArrayObj = value[subDocArrayName];
//     const subDoc = subDocArrayObj[subDocArrayName1].find((doc: any) => doc._id.toString() === subId);
//     if (!subDoc) {
//         throw new NotFoundException('Sub-document not found');
//     }
  
//     subDoc.is_deleted = !subDoc.is_deleted;
  
//     value.markModified(subDocArrayName);

//     value[metadataFields.lastModifiedOn] = new Date();

//     await value.save();
  
//     const data = value[subDocArrayName];
//     return data[subDocArrayName1].find((doc: any) => doc._id.toString() === subId);
// }




// async updateSubDocumentDeleteFlag(
//     id: string,
//     subDocArrayName: string,
//     subId: string,
//     metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//   ): Promise<any> {
//     const value = await this.model.findById(id).exec();
//     if (!value) {
//       throw new NotFoundException('Main document not found');
//     }
  
//     const data = value[subDocArrayName];
    
//     console.log("data:", data);
  
//     let subDoc = null;
  
//     if (Array.isArray(data)) {
//       subDoc = data.find((doc: any) => doc._id.toString() === subId);
//     }
  
//     if (!subDoc) {
//       const keys = Object.keys(data);
  
//       for (const key of keys) {
//         const arrayOrObject = data[key];
//         if (Array.isArray(arrayOrObject)) {
//           for (const doc of arrayOrObject) {
//             if (doc._id.toString() === subId) {
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
//                 if (doc._id.toString() === subId) {
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
  
//     value.markModified(subDocArrayName);
  
//     value[metadataFields.lastModifiedOn] = new Date();
  
//     await value.save();
  
//     return subDoc;
//   }
  
  
  
//   async updateSubDocumentDeleteFlag(
//       id: string,
//       subDocArrayName: string,
//       subId: string,
//       metadataFields: { lastModifiedBy: string; lastModifiedOn: string } = { lastModifiedBy: 'last_modified_by', lastModifiedOn: 'last_modified_on' }
//     ): Promise<any> {
//       const value = await this.model.findById(id).exec();
//       if (!value) {
//           throw new NotFoundException('Main document not found');
//       }
      
//       const data = value[subDocArrayName];
//       console.log("data:", data);
//       const subDoc = value[subDocArrayName].find((doc: any) => doc._id.toString() === subId);
//       if (!subDoc) {
//           throw new NotFoundException('Sub-document not found');
//       }
    
//       subDoc.is_deleted = !subDoc.is_deleted;
    
//       value.markModified(subDocArrayName);

//       value[metadataFields.lastModifiedOn] = new Date();

//       await value.save();
    
//       return value[subDocArrayName].find((doc: any) => doc._id.toString() === subId);
//   }

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

}


 // async findOne(criteria: FilterQuery<T>): Promise<T | null> {
    //     return this.model.findOne(criteria).exec();
    // }