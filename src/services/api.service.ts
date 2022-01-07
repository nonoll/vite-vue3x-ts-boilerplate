import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { API_METHOD } from '@/constants/api.constants';

export interface APICallOptions {
  useAuthorization: boolean;
}

export type ApiRequestIdsType = {[key: string]: unknown | any};

const parsedRequestIds = (url: string, requestIds: ApiRequestIdsType): string => {
  let parsedUrl = url;
  Object.keys(requestIds).forEach(key => {
    parsedUrl = parsedUrl.replace(RegExp(`\\{${key}\\}`, 'g'), requestIds[key]);
  });

  return parsedUrl;
};

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

class APIService {
  protected $axios = axios;

  toURL(url: string, requestIds?: ApiRequestIdsType): string {
    if (requestIds) {
      return `${API_URL}${parsedRequestIds(url, requestIds)}`;
    }

    return `${API_URL}${url}`;
  }

  async GET<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.GET;

    if (request.data) {
      const { params, data } = request;
      request.params = Object.assign({}, params, data);
      delete request.data;
    }

    return this.APICall<T>(request, callOptions);
  }

  async POST<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.POST;

    return this.APICall<T>(request, callOptions);
  }

  async PUT<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.PUT;

    return this.APICall<T>(request, callOptions);
  }

  async DELETE<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.DELETE;

    return this.APICall<T>(request, callOptions);
  }

  async PATCH<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.PATCH;

    return this.APICall<T>(request, callOptions);
  }

  async OPTIONS<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.OPTIONS;

    return this.APICall<T>(request, callOptions);
  }

  async HEAD<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions) {
    request.method = API_METHOD.HEAD;

    return this.APICall<T>(request, callOptions);
  }

  private async APICall<T = unknown>(request: AxiosRequestConfig, callOptions?: APICallOptions): Promise<AxiosResponse<T> | AxiosError> {
    request.headers = Object.assign(
      {},
      { 'content-type': 'application/json' },
      request.headers || {}
    );

    // ! remove requestIds
    delete request.data?.requestIds;

    // ! APICall 추가 options 구성
    callOptions = callOptions || { useAuthorization: true };
    const { useAuthorization } = callOptions;

    if (useAuthorization) {
      request.headers = {
        ...(request.headers || {}),
        // ...getAccessTokenHeader()
      };
    }

    return await this.$axios(request);
  }
}

export default new APIService();
