import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('users') // Base path for the routes
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(Number(id));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.userService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedData: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(Number(id), updatedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.userService.delete(Number(id));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
