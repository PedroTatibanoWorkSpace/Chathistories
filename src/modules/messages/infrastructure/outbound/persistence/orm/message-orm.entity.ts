import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'chat_id', type: 'uuid' })
  chatId: string;

  @Column({ name: 'phone_id', type: 'uuid' })
  phoneId: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @Column({ name: 'author_id', type: 'uuid', nullable: true })
  authorId: string | null;

  @Column({ name: 'external_id', type: 'varchar', length: 255 })
  externalId: string;

  @Column({ name: 'chat_external_id', type: 'varchar', length: 255 })
  chatExternalId: string;

  @Column({ name: 'phone_external_id', type: 'varchar', length: 255 })
  phoneExternalId: string;

  @Column({ name: 'account_external_id', type: 'varchar', length: 255 })
  accountExternalId: string;

  @Column({ name: 'author_external_id', type: 'varchar', length: 255, nullable: true })
  authorExternalId: string | null;

  @Column({ name: 'wa_message_id', type: 'varchar', length: 500 })
  waMessageId: string;

  @Column({ name: 'wa_sender_id', type: 'varchar', length: 255 })
  waSenderId: string;

  @Column({ name: 'sender_name', type: 'varchar', length: 255, nullable: true })
  senderName: string | null;

  @Column({ name: 'status', type: 'smallint' })
  status: number;

  @Column({ name: 'is_approved', type: 'boolean', default: false })
  isApproved: boolean;

  @Column({ name: 'type', type: 'smallint' })
  type: number;

  @Column({ name: 'is_out', type: 'boolean' })
  isOut: boolean;

  @Column({ name: 'ack', type: 'smallint' })
  ack: number;

  @Column({ name: 'is_template', type: 'boolean', default: false })
  isTemplate: boolean;

  @Column({ name: 'options_open', type: 'boolean', default: false })
  optionsOpen: boolean;

  @Column({ name: 'deleted', type: 'boolean', default: false })
  deleted: boolean;

  @Column({ name: 'hide', type: 'boolean', default: false })
  hide: boolean;

  @Column({ name: 'processor', type: 'integer', default: 0 })
  processor: number;

  @Column({ name: 'is_forwarded', type: 'boolean', default: false })
  isForwarded: boolean;

  @Column({ name: 'from_device', type: 'boolean', default: false })
  fromDevice: boolean;

  @Column({ name: 'text', type: 'text', nullable: true })
  text: string | null;

  @Column({ name: 'quotes', type: 'text', nullable: true })
  quotes: string | null;

  @Column({ name: 'quotes_type', type: 'smallint', nullable: true })
  quotesType: number | null;

  @Column({ name: 'quotes_wa_message_id', type: 'varchar', length: 500, nullable: true })
  quotesWaMessageId: string | null;

  @Column({ name: 'quotes_thumb', type: 'text', nullable: true })
  quotesThumb: string | null;

  @Column({ name: 'file', type: 'jsonb', nullable: true })
  file: any;

  @Column({ name: 'products', type: 'jsonb', nullable: true })
  products: any;

  @Column({ name: 'vcard_contacts', type: 'jsonb', nullable: true })
  vcardContacts: any;

  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata: any;

  @Column({ name: 'bot_response', type: 'jsonb', nullable: true })
  botResponse: any;

  @Column({ name: 'watson_response', type: 'jsonb', nullable: true })
  watsonResponse: any;

  @Column({ name: 'error_details', type: 'jsonb', nullable: true })
  errorDetails: any;

  @Column({ name: 'edits', type: 'jsonb', nullable: true })
  edits: any;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;

  @PrimaryColumn({ name: 'timestamp', type: 'timestamptz' })
  timestamp: Date;

  @Column({ name: 'send_date', type: 'timestamptz', nullable: true })
  sendDate: Date | null;
}
