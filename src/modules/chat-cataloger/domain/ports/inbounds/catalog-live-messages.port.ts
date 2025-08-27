export interface CatalogLiveMessagesOptions {
  intervalSeconds?: number;
  filters?: any;
}

export interface CatalogLiveMessagesPort {
  execute(options?: CatalogLiveMessagesOptions): Promise<void>;
}
