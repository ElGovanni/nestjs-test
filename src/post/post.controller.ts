import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import PostService from './post.service';
import PostEntity from './post.entity';
import CreatePostDto from './dto/create.dto';

@Controller('post')
export default class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  index() {
    return this.service.getAll();
  }

  @Get(':id')
  async element(@Param('id') id: string): Promise<PostEntity> {
    return await this.service.findById(Number(id));
  }

  @Post()
  async create(@Body() post: CreatePostDto): Promise<PostEntity> {
    return await this.service.create(post);
  }
}
