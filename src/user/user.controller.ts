import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id);
    }

    @Post('')
    async createUser(@Body() createUserDto: any) {
        return await this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }
}
