import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.registerService.signUp(registerDto);
  }
}
