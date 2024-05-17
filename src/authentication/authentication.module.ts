import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthenticationRepository } from 'src/repositories/authentication.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: 'your_secret_key',
            signOptions: { expiresIn: '1d' }, // Adjust expiration as needed
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, AuthenticationRepository],
})
export class AthenticationModule {}
