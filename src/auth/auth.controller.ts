import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

export type AuthBody = { email: string; password: string };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return await this.authService.login({ authBody });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request: ExpressRequest) {
    console.log(request.user);
    return { message: 'Authenticated' };
  }
}
