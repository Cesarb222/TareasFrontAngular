import { ApplicationConfig, provideBrowserGlobalErrorListeners
  ,provideZonelessChangeDetection   } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch,withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth-interceptor';
import Aura from '@primeuix/themes/aura'
import { providePrimeNG } from 'primeng/config';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};
