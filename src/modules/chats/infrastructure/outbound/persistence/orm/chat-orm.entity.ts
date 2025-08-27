import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'chats' })
export class ChatOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'external_id', type: 'varchar', length: 255, unique: true })
  externalId: string;

  @Column({ name: 'phone_id', type: 'uuid' })
  phoneId: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @Column({ name: 'wa_chat_id', type: 'varchar', length: 255 })
  waChatId: string;

  @Column({ name: 'name', type: 'varchar', length: 500 })
  name: string;

  @Column({ name: 'kind', type: 'varchar', length: 50 })
  kind: string;

  @Column({ name: 'picture', type: 'text', nullable: true })
  picture?: string;

  @Column({ name: 'status', type: 'smallint' })
  status: number;

  @Column({ name: 'favorite', type: 'boolean', default: false })
  favorite: boolean;

  @Column({ name: 'archived', type: 'boolean', default: false })
  archived: boolean;

  @Column({ name: 'scheduled', type: 'boolean', default: false })
  scheduled: boolean;

  @Column({ name: 'new_messages', type: 'integer', default: 0 })
  newMessages: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
