import axios, { type AxiosRequestConfig } from 'axios';
import type { HttpService } from '.';

export class AxiosHttpService implements HttpService {
  get<SuccessResponseData, ErrorResponseData>(url: string, config?: AxiosRequestConfig) {
    return axios.get<SuccessResponseData, ErrorResponseData>(url, config);
  }
}
