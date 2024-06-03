import { User } from '../user/user.schema';
import { AuthenticationRepository } from './authentication.repository';
export declare class AuthenticationService {
    private readonly authenticationRepository;
    constructor(authenticationRepository: AuthenticationRepository);
    validateUser(mail: string, password: string): Promise<User>;
}
