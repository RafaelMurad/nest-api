import { ResultDto } from 'src/dto/result.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
 constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

 async create(createUserDto: CreateUserDto): Promise<ResultDto> {

  let user = new User();
  user.name = createUserDto.name;
  user.email = createUserDto.email;
  user.password = bcrypt.hashSync(createUserDto.password, 8);
  try {
     const result = await this.repository.save(user);
     return {
       status: true,
       message: 'User created',
     };
   } catch (error) {
     return {
       status: false,
       message: error.message,
     };
   }
  }

 async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
   const user = await this.repository.preload({
     id: id,
     name: updateUserDto.name,
     email: updateUserDto.email,
     password: bcrypt.hashSync(updateUserDto.password, 8)
   });
   if (!user) {
     throw new NotFoundException(`user ${id} not found`);
   }
   return this.repository.save(user);
 }

  async remove(id: string) {
    const user = await this.getById(id);
    return this.repository.remove(user);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email: email });
  }

  async getById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ id: id });
  }
}
