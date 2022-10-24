import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) { }

  async create(user: CreateUserDto) {
    try {
      return await this.repo.save(user);;
    }
    catch (error) {      
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists.');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, user: UpdateUserDto) {
    try {
      return await this.repo.update(id, user);;
    }
    catch (error) {      
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
