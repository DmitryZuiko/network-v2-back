import { Entity, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { CommonEntity } from "src/common/entities/common.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity()
export class Post extends CommonEntity {
  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Index()
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}