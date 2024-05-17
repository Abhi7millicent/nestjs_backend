import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'; 
import { Encryption } from 'src/utils/encryption';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryption: Encryption,
    ) {}

    async getUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id: string) {
        return await this.userRepository.findById(id);
    }

    async createUser(createUserDto: any) {
        const encryptedPassword = await this.encryption.encryptData(createUserDto.password);
        const user = { ...createUserDto, password: encryptedPassword };
        return await this.userRepository.create(user);
    }

    async updateUser(id: string, updateUserDto: any) {
        return await this.userRepository.update(id, updateUserDto);
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete(id);
    }
}
