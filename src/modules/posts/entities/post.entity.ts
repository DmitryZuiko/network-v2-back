import { Column } from "typeorm";
import { CommonEntity } from "src/common/entities/common.entity";

export class Post extends CommonEntity {
  @Column({ type: 'varchar', length: 255 })
    text: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
    imageUrl: string;
}