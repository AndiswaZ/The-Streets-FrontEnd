import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { DevUserService } from './dev-user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const devUserService = inject(DevUserService);
  const user = devUserService.get();

  if (user?.id) {
    const headers = req.headers
      .set('X-User-Id', user.id)
      .set('X-User-Name', user.name ?? 'Anonymous')
      .set('X-User-Role', user.role ?? 'User');

    const authReq = req.clone({ headers });
    return next(authReq);
  }

  return next(req);
};
