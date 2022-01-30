import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/register')
  async register(@Request() req): Promise<any> {
    return this.authService.register(req.user);
  }
}
