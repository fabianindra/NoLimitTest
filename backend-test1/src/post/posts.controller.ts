import { Body, Param, Req, UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    const numberId = parseInt(id, 10);
    return this.postsService.getPostById(numberId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('content') content: string, @Req() req: any) {
    const userId = req.user.userId;
    return this.postsService.createPost(userId, content);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePost(@Param('id') id: number, @Body() body, @Req() req) {
    return this.postsService.updatePost(id, body.content, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: number, @Req() req) {
    return this.postsService.deletePost(id, req.user.userId);
  }
}
