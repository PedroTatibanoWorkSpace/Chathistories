export interface ChatListResponse {
  total_chats: number;
  total_returned: number;
  page_num: number;
  chats: ChatData[];
}

export interface ChatData {
  id: string;
  phone_id: string;
  account_id: string;
  wa_chat_id: string;
  name: string;
  kind: 'chat' | 'group';
  picture?: string;
  status: string;
  favorite: boolean;
  archived: boolean;
  scheduled: boolean;
  new_messages: number;
  updated: string;
  created: string;
  last_message: {
    text: string;
    date: string;
  };
  users_delegated_ids: string[];
  groups_delegated_ids: string[];
  funnel_steps_ids: string[];
  tags: Array<{
    text: string;
    color: string;
    bg: string;
  }>;
}

export interface MessagesResponse {
  cst: string;
  hide_msg_content: boolean;
  cst_cls: string;
  messages_and_notes: Array<{
    type: string;
    m: MessageData;
    date: { $date: string };
  }>;
  chat_actions_need_approval: any[];
  messages_and_actions_scheduled: any[];
  count_msg_sent_paginated: number;
  count_msg_pending: number;
  count_msg_sending: number;
  count_msg_sent: number;
  last_msg_received_id: string;
  chat_id: string;
  page_num: number;
  repeated?: boolean; 
}

export interface MessageData {
  _id: { $oid: string };
  created: { $date: string };
  timestamp: { $date: string };
  send_date: { $date: string };
  author?: { $oid: string };
  chat: { $oid: string };
  phone: { $oid: string };
  account_id: { $oid: string };
  wa_message_id: string;
  wa_sender_id: string;
  status: string;
  is_approved: boolean;
  type: string;
  is_out: boolean;
  ack: number;
  text: string;
  sender_name?: string;
  quotes?: string;
  quotes_type?: string;
  quotes_wa_message_id?: string;
  products: any[];
  vcard_contacts: any[];
  bot_response?: any;
  watson_response?: any;
  metadata?: any;
  options_open: boolean;
  is_template: boolean;
  deleted: boolean;
  hide: boolean;
  processor: number;
  error_details: string;
  edits: Array<{
    date: { $date: string };
    old_text: string;
  }>;
  is_forwarded: boolean;
  from_device?: boolean;
  reactions?: any[];
  order_details?: any[];
}

export interface ChatGuruRequestPort {
  getChatList(pageNum: number, filters?: any): Promise<ChatListResponse>;
  getMessages(chatId: string, page: number, lastFirstId?: string): Promise<MessagesResponse>;
}
