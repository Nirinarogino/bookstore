import { ConflictException, Injectable } from '@nestjs/common';
import { SubscribeDto } from '../user/dto/subscribe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async  subscribe(userData: SubscribeDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);
    const user = this.userRepository.create({ ...userData, salt, password });
       
    try {
      await this.userRepository.save(user);
    } catch (err) {
      throw new ConflictException(err);
    }
      delete user.password;
      delete user.salt;
    
    return user;
  }
}
