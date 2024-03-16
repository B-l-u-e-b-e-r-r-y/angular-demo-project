import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiParams } from './api-params';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) {}
  BACKEND_SERVER = environment.apiUrl;
  API_TOKEN = environment.apiToken;

  async get(path: string, params?: ApiParams): Promise<any> {
    const httpPararms = this.generateHttpParams(params);
    return await this.http.get<any>(this.BACKEND_SERVER + path, { params: httpPararms }).toPromise();
  }

  async post(path: string, payload: any, params?: ApiParams): Promise<any> {
    const httpPararms = this.generateHttpParams(params);
    return await this.http.post<any>(this.BACKEND_SERVER + path, payload, { params: httpPararms }).toPromise();
  }

  async put(path: string, payload: any, params?: ApiParams): Promise<any> {
    const httpPararms = this.generateHttpParams(params);
    return await this.http.put<any>(this.BACKEND_SERVER + path, payload, { params: httpPararms }).toPromise();
  }

  async delete(path: string, params?: ApiParams): Promise<any> {
    const httpPararms = this.generateHttpParams(params);
    return await this.http.delete<any>(this.BACKEND_SERVER + path, { params: httpPararms }).toPromise();
  }

  generateHttpParams(params?: ApiParams): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('$token', this.API_TOKEN);
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return httpParams;
  }

  // for other api
  async getHttpApi(path: string, params?: any): Promise<any> {
    const httpPararms = this.generateHttpParams(params);
    return await this.http.get<any>(path, { params: httpPararms }).toPromise();
  }

  // for local json (development)
  async getLocalJson(path: string): Promise<any> {
    return await this.http.get<any>(path).toPromise();
  }

}
