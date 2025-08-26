import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class ChatGuruReqService {
  private sessionCookie: string = process.env.CHATGURU_COOKIE || '';

  constructor(private readonly http: HttpService) {}

  async fetch<T = any>(path: string, options: AxiosRequestConfig = {}): Promise<T> {

    try {
      const res: AxiosResponse<T> = await this.http.axiosRef.request({
        url: `${process.env.CHATGURU_URL}${path}`,
        headers: {
          ...options.headers,
          Cookie: `session=${this.sessionCookie}`,
        },
        ...options,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
