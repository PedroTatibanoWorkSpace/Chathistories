import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'chat_delegations' })
export class ChatDelegationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'chat_id', type: 'uuid' })
  chatId: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @Column({ name: 'group_external_id', type: 'varchar', length: 255, nullable: true })
  groupExternalId?: string;

  @Column({ name: 'delegation_type', type: 'varchar', length: 20 })
  delegationType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
