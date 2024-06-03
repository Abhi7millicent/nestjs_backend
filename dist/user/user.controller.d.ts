import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("./user.schema").User[]>;
    getUserById(id: string): Promise<import("./user.schema").User>;
    createUser(createUserDto: any): Promise<import("./user.schema").User>;
    updateUser(id: string, updateUserDto: any): Promise<import("../dto/update.response.dto").updateResponseDto & {
        updatedData: import("./user.schema").User;
    }>;
    deleteUser(id: string): Promise<import("./user.schema").User>;
}
