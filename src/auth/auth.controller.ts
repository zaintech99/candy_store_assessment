import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() user: any) {
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() user) {
        return this.authService.register(user);
    }

    @UseGuards(LocalAuthGuard)
    @Get('logout')
    async logout(@Req() req: any) {
        return this.authService.logout(req.user);
    }
}