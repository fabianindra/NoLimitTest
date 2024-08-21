import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
