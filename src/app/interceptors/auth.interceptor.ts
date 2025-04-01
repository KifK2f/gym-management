import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log(token);

  if (token) {
    console.log(token);
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    console.log(clonedReq);
    return next(clonedReq);
  }

  return next(req);
};
