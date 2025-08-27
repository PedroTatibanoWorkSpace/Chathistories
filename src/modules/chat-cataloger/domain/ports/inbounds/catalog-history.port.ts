export interface CatalogHistoryStats {
  totalChatsProcessed: number;
  totalMessagesProcessed: number;
  startTime: Date;
  endTime: Date;
  durationMs: number;
  errors: Array<{
    chatId?: string;
    page?: number;
    error: string;
    timestamp: Date;
  }>;
}

export interface CatalogHistoryOptions {
  maxConcurrentChats?: number;
  maxConcurrentMessages?: number;
  batchSize?: number;
  delayBetweenRequests?: number;
  retryAttempts?: number;
  resumeFromChatId?: string;
}

export interface CatalogHistoryPort {
  execute(options?: CatalogHistoryOptions): Promise<CatalogHistoryStats>;
}
