import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/authdto.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post()
    async authentication(
        @Body() user: AuthDto,
    ){  
        return await this.authService.authentication(user)
    }
}
