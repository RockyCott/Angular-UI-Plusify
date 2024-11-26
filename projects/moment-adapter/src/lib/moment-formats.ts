import { NgxPlusifyDateFormats } from '@angular-ui-plusify/datetime-picker';

const DEFAULT_DATE_INPUT = 'l, LTS';

export const NGX_PLUSIFY_MOMENT_FORMATS: NgxPlusifyDateFormats = {
  parse: {
    dateInput: DEFAULT_DATE_INPUT,
  },
  display: {
    dateInput: DEFAULT_DATE_INPUT,
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
