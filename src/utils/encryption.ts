import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Encryption {
    async encryptData(data: string): Promise<string> {
        const saltRounds = 10; // You can adjust the number of salt rounds for bcrypt
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    }
}