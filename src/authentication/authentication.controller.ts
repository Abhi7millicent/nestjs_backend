import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly jwtService: JwtService
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authenticationService.validateUser(loginDto.mail, loginDto.password);
        if (!user) {
            // Handle invalid credentials
            throw new UnauthorizedException('Invalid credentials');
        }
        // Generate JWT token
        const token = this.jwtService.sign({ userId: user._id, role: user.role });
        return { token };
    }
}
