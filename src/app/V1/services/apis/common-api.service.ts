import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '../../utils/token.interface';
import { ConstantsService } from '../../utils/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) { }

  updateToken(token: Token) {
    sessionStorage.setItem("authToken", token.authToken);
    sessionStorage.setItem("refreshToken", token.refreshToken);
  }

  sendPostNoAuth(url: string, body: any) {
    return this.http.post(url, body).toPromise();
  }

  sendPostWithAuth(url: string, body: any) {
    let promise = new Promise((resolve, reject) => {
      const authToken = sessionStorage.getItem("authToken");
      this.http.post(url, body, { headers: { "Authorization": authToken } })
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          error => {
            const refreshToken = sessionStorage.getItem("refreshToken");
            this.http.post(ConstantsService.DATABASE + "/refresh/token", { authToken, refreshToken })
              .toPromise()
              .then(
                (token: Token) => {
                  this.updateToken(token);
                  this.http.post(url, body, { headers: { "Authorization": sessionStorage.getItem("authToken") } })
                    .toPromise()
                    .then(res => {
                      resolve(res);
                    }, error => {
                      reject(error);
                    });
                },
                error => {
                  reject(error);
                })
          }
        );
    });
    return promise;
  }

  sendGetWithAuth(url: string) {
    let promise = new Promise((resolve, reject) => {
      const authToken = sessionStorage.getItem("authToken");
      this.http.get(url, { headers: { "Authorization": authToken } })
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          error => {
            const refreshToken = sessionStorage.getItem("refreshToken");
            this.http.post(ConstantsService.DATABASE + "/refresh/token", { authToken, refreshToken })
              .toPromise()
              .then(
                (token: Token) => {
                  this.updateToken(token);
                  this.http.get(url, { headers: { "Authorization": sessionStorage.getItem("authToken") } })
                    .toPromise()
                    .then(res => {
                      resolve(res);
                    }, error => {
                      reject(error);
                    });
                },
                error => {
                  reject(error);
                })
          }
        );
    });
    return promise;
  }
}
