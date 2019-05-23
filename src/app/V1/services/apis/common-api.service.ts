import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) { }

  registerNewUser(url: string, body: any) {
    return this.http.post(url, body);
  }

  login(url: string, body: any) {
    return this.http.post(url, body);
  }
}
