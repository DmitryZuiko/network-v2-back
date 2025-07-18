import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  update(
  @Param('id') id: string, 
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
