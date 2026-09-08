import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { buildFakeJwt } from '../mocks/mock-data';

// ---------------------------------------------------------------------------
// DEMO MOCK API INTERCEPTOR
// ---------------------------------------------------------------------------
// This interceptor exists only in this portfolio-demo fork of the project.
// This is a generic starter kit — every screen is self-contained UI with
// no real backend behind it, except auth, which is mocked below.
// ---------------------------------------------------------------------------

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const path = request.url.split('?')[0];

    if (path.endsWith('/v1/auth/login') && request.method === 'POST') {
      return this.mockResponse({
        accessToken: buildFakeJwt(),
        refreshToken: 'demo-refresh-token',
      });
    }

    if (path.endsWith('/v1/auth/refresh') && request.method === 'POST') {
      return this.mockResponse({
        accessToken: buildFakeJwt(),
        refreshToken: 'demo-refresh-token',
      });
    }

    if (path.endsWith('/v1/auth/logout') && request.method === 'POST') {
      return this.mockResponse({});
    }

    if (path.endsWith('/v1/auth/change-password') && request.method === 'POST') {
      return this.mockResponse({});
    }

    if (path.endsWith('/v1/users/forgot-password') && request.method === 'POST') {
      return this.mockResponse({});
    }

    if (path.endsWith('/v1/users/reset-password') && request.method === 'POST') {
      return this.mockResponse({});
    }

    // Everything else in this app is static UI with no real backend
    // call — nothing else needs to be mocked here.
    return next.handle(request);
  }

  private mockResponse<T>(body: T): Observable<HttpEvent<any>> {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(900));
  }
}
