import { ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Column, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Post extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  content: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;
}
