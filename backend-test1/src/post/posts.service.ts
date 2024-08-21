import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from 'src/users/user.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createPost(userId: string, content: string): Promise<Post> {
    const id = parseInt(userId);
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.postModel.create({
      content,
      authorId: user.id,
    });
  }

  async getAllPosts() {
    return this.postModel.findAll({ include: ['author'] });
  }

  async getPostById(numberId: number) {
    const post = await this.postModel.findByPk(numberId, {
      include: ['author'],
    });
    return post;
  }

  async updatePost(id: number, content: string, userId: number) {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId)
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    post.content = content;
    post.updatedAt = new Date();
    return post.save();
  }

  async deletePost(id: number, userId: number) {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId)
      throw new UnauthorizedException(
        'You are not allowed to delete this post',
      );
    return post.destroy();
  }
}
