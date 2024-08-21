import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Post } from './post/post.model';
import { UsersModule } from './users/users.module';
import { PostsModule } from './post/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'blog',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User, Post]),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}
