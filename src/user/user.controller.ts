import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
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
    create(@Body() user: { name: string; last_name: string ; email: string; password: string; role: string;}) {
        return this.userService.create(user);
    }
    
    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updatedUser: Partial<{ name: string; prenom: string; email: string; password: string; role: string }>,
    // ){
    //     return this.userService.update(+id, updatedUser);
    // }

    @Patch()
    update(
        @Query('id') id: string,
        @Body() updatedUser: { name?: string; last_name?: string; email?: string; password?: string; role?: string },
    ) {
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




