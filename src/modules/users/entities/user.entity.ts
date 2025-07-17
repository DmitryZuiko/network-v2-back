import { Column, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Post } from 'src/modules/posts/entities/post.entity';

export class User extends CommonEntity {
  @Column({ type: 'varchar', unique: true })
    username: string;

  @Column({ type: 'varchar', nullable: true })
    firstName: string;

  @Column({ type: 'varchar', nullable: true })
    lastName: string;

  @Column({ type: 'varchar', nullable: true })
    avatarUrl?: string;

  @Column({ type: 'varchar', select: false })
    passwordHash: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
    posts: Post[];
}
