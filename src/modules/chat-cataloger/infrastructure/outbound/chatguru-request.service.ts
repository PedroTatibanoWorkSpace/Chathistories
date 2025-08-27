import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import {
  ChatGuruRequestPort,
  ChatListResponse,
  MessagesResponse,
} from '../../domain/ports/outbounds/chatguru-request.port';

@Injectable()
export class ChatGuruRequestService implements ChatGuruRequestPort {
  private readonly logger = new Logger(ChatGuruRequestService.name);
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;
  private readonly sessionToken: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.validateConfig('CHATGURU_URL');
    this.sessionToken = this.validateConfig('CHATGURU_COOKIE');
    
    this.httpClient = axios.create({
      timeout: 60 * 2000,
      headers: {
        'Cookie': `session=${this.sessionToken}`,
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private validateConfig(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Configuração obrigatória não encontrada: ${key}`);
    }
    return value;
  }

  private setupInterceptors(): void {
    this.httpClient.interceptors.request.use((config) => {
      return config;
    });

    this.httpClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        this.logger.error(`Request failed: ${error.message}`, error.stack);
        throw error;
      }
    );
  }

  async getChatList(pageNum: number = 0, filters?: any): Promise<ChatListResponse> {
    const url = `${this.baseUrl}/chatlist/store`;
    const params = { nocache: Date.now() };
    
    const defaultPayload = {
      page_num: pageNum,
      ...filters,
    };

    try {
      const response = await this.httpClient.post<ChatListResponse>(
        url,
        defaultPayload,
        { params }
      );
      
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get chat list for page ${pageNum}:`, error.message);
      throw error;
    }
  }

  async getMessages(chatId: string, page: number = 1): Promise<MessagesResponse & { repeated?: boolean }> {
    const url = `${this.baseUrl}/messages2/${chatId}/page/${page}`;
    try {
      const response = await this.httpClient.get<MessagesResponse>(url);
      const data = response.data;
      return data;
    } catch (error) {
      this.logger.error(`Falha ao buscar mensagens para o chat ${chatId}, página ${page}:`, error.message);
      throw error;
    }
  }
}
