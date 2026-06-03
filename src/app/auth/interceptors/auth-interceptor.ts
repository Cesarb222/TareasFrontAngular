import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('tjwt')
  if(token){
    const reqClonado = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next(reqClonado)
  }
  return next(req);
};
