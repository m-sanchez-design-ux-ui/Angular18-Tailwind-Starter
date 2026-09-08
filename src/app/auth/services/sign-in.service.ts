import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { PasswordChangeRequest } from '../pages/password-change/models/PasswordChange.model';
import { LoginRequest } from '../pages/sign-in/models/login-request.model';
import { ConfigService } from '../../shared/config.service';
import { IForgotPasswordRequest } from '../interfaces/forgot-password.interface';
import { IResetPasswordRequest } from '../interfaces/reset-password.interface';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  public static readonly TOKEN = 'token';
  public static readonly REFRESHTOKEN = 'refreshToken';
  public static readonly REFRESHCOUNT = 'refreshCount';

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService
  ) {}

  getToken() {
    return localStorage.getItem(SignInService.TOKEN);
  }

  refreshToken() {
    const clientId = this.getDecodedToken().id;
    const data = {
      refreshToken: localStorage.getItem('refreshToken'),
      clientId: clientId,
    };
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/v1/auth/refresh`, data)
      .pipe(
        tap((tokens) => {
          localStorage.setItem(SignInService.REFRESHCOUNT, '0');
          localStorage.setItem(SignInService.REFRESHTOKEN, tokens.refreshToken);
          localStorage.setItem(SignInService.TOKEN, tokens.accessToken);
        })
      );
  }

  getDecodedToken(): any {
    const token = localStorage.getItem(SignInService.TOKEN);
    if (token == null) {
      this.router.navigate(['signin']);
      return;
    }
    // DEMO NOTE: if a stale/incompatible token is sitting in localStorage
    // (e.g. from testing a different demo on the same localhost port),
    // jwtDecode() throws instead of returning something usable. Guard
    // against that so this fork fails gracefully back to the login
    // screen instead of crashing the authorized layout.
    try {
      return jwtDecode(token);
    } catch {
      localStorage.removeItem(SignInService.TOKEN);
      localStorage.removeItem(SignInService.REFRESHTOKEN);
      this.router.navigate(['signin']);
      return { role: [], sub: '' };
    }
  }

  getRoles(): string[] | string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.role;
  }

  getUserName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.sub;
  }

  login(data: LoginRequest) {
    return this.httpClient.post<any>(
      `${this.configService.getProperty('apiUrl')}/v1/auth/login`,
      data
    );
  }

  forgotPassword(request: IForgotPasswordRequest) {
    return this.httpClient.post(
      `${this.configService.getProperty('apiUrl')}/v1/users/forgot-password`,
      request
    );
  }

  resetPassword(request: IResetPasswordRequest) {
    return this.httpClient.post(
      `${this.configService.getProperty('apiUrl')}/v1/users/reset-password`,
      request
    );
  }

  changePassword(request: PasswordChangeRequest) {
    return this.httpClient.post<any>(
      `${this.configService.getProperty('apiUrl')}/v1/auth/change-password`,
      request
    );
  }

  logout() {
    return this.httpClient.post<any>(`${this.configService.getProperty('apiUrl')}/v1/auth/logout`, {
      refreshToken: localStorage.getItem('refreshToken'),
    });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getOriginCompanyId() {
    return this.configService.getProperty('originCompanyId');
  }
}
