import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    async getBorrowedBookByAdmin(
        @UserReq() user: any,
    ){
        return await this.adminService.getByAdminAllBorrowed(user)
    }
    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllUser(
        @UserReq() user: any,
    ){
        return await this.adminService.getAllUser(user)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async accepted(
        @Body() title: any,
        @UserReq() user: any,
    ){
        return await this.adminService.DemandeAccepeted(title, user)
    }
}
