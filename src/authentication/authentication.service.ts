import { Injectable, UnauthorizedException } from '@nestjs/common';
import  {User}  from '../user/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthenticationRepository } from 'src/repositories/authentication.repository';

@Injectable()
export class AuthenticationService {
    constructor(private readonly authenticationRepository: AuthenticationRepository) {}

    async validateUser(mail: string, password: string): Promise<User> {
        const user = await this.authenticationRepository.findByMail(mail);
        if (!user) {
            return null; // User not found
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log("isPasswordValid",isPasswordValid);
        // if (!isPasswordValid) {
        //     return null; // Invalid password
        // }
        if(password !== user.password){
        return null
        }
        return user;
    }
}
