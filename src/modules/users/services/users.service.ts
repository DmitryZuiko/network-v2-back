import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import logger from 'src/common/utils/logger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(dto);

      return await this.userRepository.save(user);
    } catch (error) {
      logger.error('Error in UsersService: create', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User with id "${id}" not found`);
      }
      
      return user;
    } catch (error) {
      logger.error('Error in UsersService: findById', error);
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ username });

      if (!user) {
        throw new NotFoundException(`User with username "${username}" not found`);
      }
      
      return user;
    } catch (error) {
      logger.error('Error in UsersService: findByUsername', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.preload({ id, ...dto });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return await this.userRepository.save(user);
    } catch (error) {
      logger.error('Error in UsersService: findByUsername', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.userRepository.softDelete({ id });
    } catch (error) {
      logger.error('Error in UsersService: deleteUser', error);
      throw error;
    }
  }
}
