export interface CatalogLiveMessagesStats {
  totalChatsProcessed: number;
  totalMessagesProcessed: number;
  startTime: Date;
  endTime: Date;
  durationMs: number;
  errors: Array<{
    chatId?: string;
    error: string;
    timestamp: Date;
  }>;
}

export interface CatalogLiveMessagesOptions {
  intervalSeconds?: number;
  filters?: any;
}

export interface CatalogLiveMessagesPort {
  execute(options?: CatalogLiveMessagesOptions): Promise<CatalogLiveMessagesStats>;
}
