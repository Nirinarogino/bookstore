import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserReq } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}
    @Get()
    @UseGuards(JwtAuthGuard)
    async getBorrowedBookByAdmin(
        @UserReq() user: any,
    ){
        return await this.adminService.getByAdminAllBorrowed(user)
    }
}
