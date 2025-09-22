import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// api
import { api } from '../api/apiLink';

@Injectable({
  providedIn: 'root',
})
export class HttpReq {
  constructor(private http: HttpClient) {}

  getRequest<T>(name: string): Observable<T> {
    return this.http.get<T>(`${api}${name}`);
  }
}
