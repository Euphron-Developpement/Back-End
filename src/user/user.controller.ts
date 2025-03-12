import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Post()
    async create(@Body() user: { name: string; last_name: string; email: string; password: string; role: string }) {
        const hashedPassword = await argon2.hash(user.password, { type: argon2.argon2id });
        const userWithHashedPassword = { ...user, password: hashedPassword };
        return this.userService.create(userWithHashedPassword);
    }
    
    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updatedUser: Partial<{ name: string; prenom: string; email: string; password: string; role: string }>,
    // ){
    //     return this.userService.update(+id, updatedUser);
    // }

    @Patch()
    async update(
        @Query('id') id: string,
        @Body() updatedUser: { name?: string; last_name?: string; email?: string; password?: string; role?: string },
    ) {
        if (updatedUser.password) {
            updatedUser.password = await argon2.hash(updatedUser.password, { type: argon2.argon2id });
        }
        return this.userService.update(+id, updatedUser);
    }

    // @Delete(':id')
    // delete(@Param('id') id: string) {
    //     return this.userService.delete(+id);
    // }

    @Delete()
    delete(@Query('id') id: string) {
      return this.userService.delete(+id);
    }
}
