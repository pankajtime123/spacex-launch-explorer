
import { ApiResponse, BaseApiConfig, BaseHttpClient } from './BaseHttpClient';

export type ApiConfig = BaseApiConfig;

class ApiWrapper extends BaseHttpClient {
  constructor(baseURL: string) {
    super(baseURL, {
      getRefreshToken: async () => {
        return  null;
      },
      onTokenRefreshed: async (authData: string) => {
       
      },
      onRefreshTokenFailure: async () => {
        
      }
    });
    this.setAuthHeaders();
  }

  private async setAuthHeaders() {
    this.instance.interceptors.request.use(async (config) => {
      if (config.skipAuthRefresh) {
        return config;
      }
      return config;
    });
  }

  public async get<T>(url: string, config?: ApiConfig): Promise<ApiResponse<T>> {
    return super.request<T>('GET', url, undefined, config);
  }

  public async post<T>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>> {
    return super.request<T>('POST', url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>> {
    return super.request<T>('PUT', url, data, config);
  }

  public async patch<T>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>> {
    return super.request<T>('PATCH', url, data, config);
  }

  public async delete<T>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>> {
    return super.request<T>('DELETE', url, data, config);
  }

  public async uploadFile<T>(
    url: string,
    file: any,
    config?: Omit<ApiConfig, 'headers'> & { headers?: Record<string, string> }
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return super.request<T>('POST', url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

const BASE_URL = 'https://api.spacexdata.com'
export const ApiClient = new ApiWrapper(BASE_URL);
