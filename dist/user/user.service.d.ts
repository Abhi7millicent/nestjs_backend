import { UserRepository } from './user.repository';
import { Encryption } from 'src/utils/encryption';
export declare class UserService {
    private readonly userRepository;
    private readonly encryption;
    constructor(userRepository: UserRepository, encryption: Encryption);
    getUsers(): Promise<import("./user.schema").User[]>;
    getUserById(id: string): Promise<import("./user.schema").User>;
    createUser(createUserDto: any): Promise<import("./user.schema").User>;
    updateUser(id: string, updateUserDto: any): Promise<import("../dto/update.response.dto").updateResponseDto & {
        updatedData: import("./user.schema").User;
    }>;
    deleteUser(id: string): Promise<import("./user.schema").User>;
}
