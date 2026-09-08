import { fakeAsync, tick } from '@angular/core/testing';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { MockApiInterceptor } from './mock-api.interceptor';

describe('MockApiInterceptor', () => {
  let interceptor: MockApiInterceptor;
  let nextHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    interceptor = new MockApiInterceptor();
    nextHandler = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);
    nextHandler.handle.and.returnValue(of());
  });

  it('mocks a successful login and returns a token pair', fakeAsync(() => {
    const request = new HttpRequest('POST', '/v1/auth/login', {});
    let response: HttpResponse<any> | undefined;

    interceptor.intercept(request, nextHandler).subscribe((event) => {
      response = event as HttpResponse<any>;
    });

    tick(900);

    expect(response?.status).toBe(200);
    expect(response?.body.accessToken).toBeTruthy();
    expect(response?.body.refreshToken).toBe('demo-refresh-token');
    // The token must be a real JWT shape (header.payload.signature),
    // since the app decodes it client-side to read the user's role.
    expect(response?.body.accessToken.split('.').length).toBe(3);
    expect(nextHandler.handle).not.toHaveBeenCalled();
  }));

  it('mocks logout with an empty successful response', fakeAsync(() => {
    const request = new HttpRequest('POST', '/v1/auth/logout', {});
    let response: HttpResponse<any> | undefined;

    interceptor.intercept(request, nextHandler).subscribe((event) => {
      response = event as HttpResponse<any>;
    });

    tick(900);

    expect(response?.status).toBe(200);
    expect(response?.body).toEqual({});
  }));

  it('falls through to the real handler for any unmocked request', () => {
    const request = new HttpRequest('GET', '/v1/some/other/endpoint');

    interceptor.intercept(request, nextHandler).subscribe();

    expect(nextHandler.handle).toHaveBeenCalledWith(request);
  });

  it('does not mock a login-like path with the wrong HTTP method', () => {
    const request = new HttpRequest('GET', '/v1/auth/login');

    interceptor.intercept(request, nextHandler).subscribe();

    expect(nextHandler.handle).toHaveBeenCalledWith(request);
  });
});
