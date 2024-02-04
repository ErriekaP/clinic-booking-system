import { Controller, Post, Body, Response, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { RegisterDto } from './auth.dto';
import { Response as ExpressResponse } from 'express';

@Controller() // Use '/login' as the endpoint
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("login") // Use POST method for handling login
  // async login(@Body() loginDto: LoginDto, @Response() res: Res) {
  //   console.log(loginDto);
  //   const result = await this.authService.login(loginDto, res);
  //   return result;
  // }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    await this.authService.signUp(registerDto);
  }


}