import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './post.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create.dto';
import UpdatePostDto from './dto/update.dto';

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  async getAll(): Promise<Post[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.repository.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async create(post: CreatePostDto): Promise<Post> {
    const entity = await this.repository.create(post);
    await this.repository.save(entity);
    return entity;
  }

  async update(id: number, post: UpdatePostDto): Promise<Post> {
    const entity = this.repository.findOne(id);
    if (!entity) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.repository.update(id, post);
    return entity;
  }

  async delete(id: number): Promise<void> {
    const entity = this.repository.findOne(id);
    if (!entity) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.repository.delete(id);
    return;
  }
}
