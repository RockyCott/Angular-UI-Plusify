import { InjectionToken } from '@angular/core';

export type NgxPlusifyDateFormats = {
  parse: {
    dateInput: any;
  };
  display: {
    dateInput: any;
    monthLabel?: any;
    monthYearLabel: any;
    dateA11yLabel: any;
    monthYearA11yLabel: any;
  };
};

export const NGX_PLUSIFY_DATE_FORMATS = new InjectionToken<NgxPlusifyDateFormats>('ngx-plusify-date-formats');
