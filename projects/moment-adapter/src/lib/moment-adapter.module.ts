import {
  NgxPlusifyDateAdapter,
  NGX_PLUSIFY_DATE_FORMATS,
} from '@angular-ui-plusify/datetime-picker';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  NgxPlusifyMomentAdapter,
  NGX_PLUSIFY_MOMENT_DATE_ADAPTER_OPTIONS,
} from './moment-adapter';
import { NGX_PLUSIFY_MOMENT_FORMATS } from './moment-formats';

@NgModule({
  providers: [
    {
      provide: NgxPlusifyDateAdapter,
      useClass: NgxPlusifyMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_PLUSIFY_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class NgxMomentDateModule {}

@NgModule({
  imports: [NgxMomentDateModule],
  providers: [
    { provide: NGX_PLUSIFY_DATE_FORMATS, useValue: NGX_PLUSIFY_MOMENT_FORMATS },
  ],
})
export class NgxPlusifyMomentModule {}
