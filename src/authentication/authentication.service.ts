import { Injectable, UnauthorizedException } from '@nestjs/common';
import  {User}  from '../user/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthenticationRepository } from './authentication.repository';

@Injectable()
export class AuthenticationService {
    constructor(private readonly authenticationRepository: AuthenticationRepository) {}

    async validateUser(mail: string, password: string): Promise<User> {
        const user = await this.authenticationRepository.findOne({ mail: mail });
        if (!user) {
            return null; // User not found
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null; // Invalid password
        }
        // if(password !== user.password){
        // return null
        // }
        return user;
    }
}
