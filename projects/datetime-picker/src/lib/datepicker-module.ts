import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { NgxPlusifyCalendar, NgxPlusifyCalendarHeader } from './calendar';
import { NgxPlusifyCalendarBody } from './calendar-body';
import { NgxPlusifyDateRangeInput } from './date-range-input';
import {
  NgxPlusifyEndDate,
  NgxPlusifyStartDate,
} from './date-range-input-parts';
import { NgxPlusifyDateRangePicker } from './date-range-picker';
import { NgxPlusifyDatetimepicker } from './datepicker';
import {
  NgxPlusifyDatepickerActions,
  NgxPlusifyDatepickerApply,
  NgxPlusifyDatepickerCancel,
} from './datepicker-actions';
import {
  NGX_PLUSIFY_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  NgxPlusifyDatepickerContent,
} from './datepicker-base';
import { NgxPlusifyDatepickerInput } from './datepicker-input';
import { NgxPlusifyDatepickerIntl } from './datepicker-intl';
import {
  NgxPlusifyDatepickerToggleIcon,
  NgxPlusifyDatepickerToggle,
} from './datepicker-toggle';
import { NgxPlusifyMonthView } from './month-view';
import { NgxPlusifyMultiYearView } from './multi-year-view';
import { NgxPlusifyYearView } from './year-view';
import { NgxPlusifyTimepickerModule } from './timepicker.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    OverlayModule,
    A11yModule,
    PortalModule,
    MatCommonModule,
    NgxPlusifyTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CdkScrollableModule,
    NgxPlusifyCalendar,
    NgxPlusifyCalendarBody,
    NgxPlusifyDatetimepicker,
    NgxPlusifyDatepickerContent,
    NgxPlusifyDatepickerInput,
    NgxPlusifyDatepickerToggle,
    NgxPlusifyDatepickerToggleIcon,
    NgxPlusifyMonthView,
    NgxPlusifyYearView,
    NgxPlusifyMultiYearView,
    NgxPlusifyCalendarHeader,
    NgxPlusifyDateRangeInput,
    NgxPlusifyStartDate,
    NgxPlusifyEndDate,
    NgxPlusifyDateRangePicker,
    NgxPlusifyDatepickerActions,
    NgxPlusifyDatepickerCancel,
    NgxPlusifyDatepickerApply,
  ],
  declarations: [
    NgxPlusifyCalendar,
    NgxPlusifyCalendarBody,
    NgxPlusifyDatetimepicker,
    NgxPlusifyDatepickerContent,
    NgxPlusifyDatepickerInput,
    NgxPlusifyDatepickerToggle,
    NgxPlusifyDatepickerToggleIcon,
    NgxPlusifyMonthView,
    NgxPlusifyYearView,
    NgxPlusifyMultiYearView,
    NgxPlusifyCalendarHeader,
    NgxPlusifyDateRangeInput,
    NgxPlusifyStartDate,
    NgxPlusifyEndDate,
    NgxPlusifyDateRangePicker,
    NgxPlusifyDatepickerActions,
    NgxPlusifyDatepickerCancel,
    NgxPlusifyDatepickerApply,
  ],
  providers: [
    NgxPlusifyDatepickerIntl,
    NGX_PLUSIFY_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
})
export class NgxPlusifyDatetimePickerModule {}
