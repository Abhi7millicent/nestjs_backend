import { ProcessBasicDataRepository } from './process.basic.data.repository';
import { ProcessBasicData } from './process.basic.data.schema';
export declare class ProcessBasicDataService {
    private readonly processBasicDataRepository;
    constructor(processBasicDataRepository: ProcessBasicDataRepository);
    createProcessBasicData(createProcessDto: Partial<ProcessBasicData>): Promise<ProcessBasicData>;
    getAllProcessBasicData(): Promise<ProcessBasicData[]>;
    getProcessBasicDataById(id: string): Promise<ProcessBasicData>;
    updateProcessBasicData(id: string, data: Partial<ProcessBasicData>): Promise<any>;
    deleteProcessBasicData(id: string): Promise<ProcessBasicData>;
    softDeleteProcessBasicData(id: string): Promise<ProcessBasicData>;
}
