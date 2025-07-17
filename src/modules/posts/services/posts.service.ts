import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import logger from 'src/common/utils/logger';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) 
    private postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto) {
    try {
      const post = this.postRepository.create(dto);

      return await this.postRepository.save(post);
    } catch (error) {
      logger.error('Error in PostsService: create', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.postRepository.preload({ id, ...dto });

      if (!post) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      return await this.postRepository.save(post);
    } catch (error) {
      logger.error('Error in PostsService: findByPostname', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.postRepository.delete({ id });
    } catch (error) {
      logger.error('Error in PostsService: deletePost', error);
      throw error;
    }
  }
}
