import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    private readonly jwtService;
    constructor(authenticationService: AuthenticationService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}
