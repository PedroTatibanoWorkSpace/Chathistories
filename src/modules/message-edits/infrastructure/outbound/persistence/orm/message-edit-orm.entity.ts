import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'message_edits' })
export class MessageEditOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'message_id', type: 'uuid', nullable: false })
  messageId: string;

  @Column({ name: 'message_timestamp', type: 'timestamptz', nullable: false })
  messageTimestamp: Date;

  @Column({ name: 'old_text', type: 'text', nullable: false })
  oldText: string;

  @Column({ name: 'edit_date', type: 'timestamptz', nullable: false })
  editDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
