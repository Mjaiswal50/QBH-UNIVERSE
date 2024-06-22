import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService, User } from './user.service';

interface CreateUserDto {
    name: string;
    email: string;
    phone: string;
    address: string;
}

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUsers(): User[] {
        return this.userService.getAllUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    editUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: Partial<CreateUserDto>): User {
        return this.userService.editUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): void {
        this.userService.deleteUser(id);
    }
}
