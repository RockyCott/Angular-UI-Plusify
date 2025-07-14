import { Location } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideNgxPlusifyNativeDate } from 'projects/datetime-picker/src';
import { APP_ROUTES } from './app.routes';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideRouter(APP_ROUTES),
    provideNgxPlusifyNativeDate(),
    Location,
    provideMarkdown(),
  ],
};
