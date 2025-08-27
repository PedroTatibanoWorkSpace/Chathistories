import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'chat_tags' })
export class ChatTagOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'chat_id', type: 'uuid', nullable: false })
  chatId: string;

  @Column({ name: 'text', type: 'varchar', length: 500, nullable: false })
  text: string;

  @Column({ name: 'color', type: 'varchar', length: 20, nullable: false })
  color: string;

  @Column({ name: 'bg_color', type: 'varchar', length: 20, nullable: false })
  bgColor: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
