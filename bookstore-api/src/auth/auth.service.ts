import { UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthDto } from "./dto/authdto.dto";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { User } from "src/entities";
import * as bcrypt from "bcrypt"

export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService

    ){}
    async authentication( userData: AuthDto) {         
        const {userName, password} = userData;
        console.log(password);  
        const user = await this.userRepository.findOneBy({userName})
        console.log(user);
        
        if(!user){
            throw new UnauthorizedException()
        }

        const hashedPassword = await bcrypt.hash(password, user.salt);    
        const actualPassword = user.password;

        if(actualPassword !== hashedPassword){
                throw new UnauthorizedException('Password mismatch');
        }
        
        const payload = {userName: user.userName, userid: user.userId, role:user.role}
        const jwt = await this.jwtService.signAsync(payload);

        return {'token': jwt}
 }
}