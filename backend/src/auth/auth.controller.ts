import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto, res);
    return result;
  }

  @Post('user')
  async getUserInfo(@Body() requestBody: any, @Res() res: Response) {
    const { supabaseUserID } = requestBody;
    try {
      const userInfo = await this.authService.fetchUserInfo(supabaseUserID);
      return res.status(200).json(userInfo);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to fetch user information' });
    }
  }
}
