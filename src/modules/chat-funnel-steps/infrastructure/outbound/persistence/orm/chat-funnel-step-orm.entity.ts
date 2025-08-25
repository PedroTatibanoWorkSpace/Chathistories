import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'chat_funnel_steps' })
export class ChatFunnelStepOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'chat_id', type: 'uuid', nullable: false })
  chatId: string;

  @Column({ name: 'funnel_step_external_id', type: 'varchar', length: 255, nullable: false })
  funnelStepExternalId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
