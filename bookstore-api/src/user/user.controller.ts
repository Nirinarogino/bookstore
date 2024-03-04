import { Body, Controller, Post } from '@nestjs/common';
import { SubscribeDto } from './dto/subscribe.dto';
import { UserService } from './user.service';
import { User } from 'src/entities';

@Controller('user')
export class UserController {
constructor(
    private userService: UserService,
){}
    @Post('create')
    async createUser( 
        @Body() user: SubscribeDto
    ): Promise<User>{
        return this.userService.subscribe(user)
    }
}
