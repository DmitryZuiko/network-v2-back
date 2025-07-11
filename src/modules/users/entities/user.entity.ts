import { Column } from "typeorm";
import { CommonEntity } from "src/common/entities/common.entity";

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
}
  