import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../pages/auth/servicies/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('requireToken')) {
    const authSvc = inject(AuthService);
    const token = authSvc.tokenValue;
    if (token) {
      const headers = req.headers.delete('requireToken')
                        .set('Authorization', `Bearer ${token}`);
      const authReq = req.clone({ headers });
      return next(authReq);
    }
  }
  return next(req);
};
