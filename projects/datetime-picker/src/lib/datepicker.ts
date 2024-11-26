import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NGX_PLUSIFY_SINGLE_DATE_SELECTION_MODEL_PROVIDER } from './date-selection-model';
import {
  NgxPlusifyDatepickerBase,
  NgxPlusifyDatepickerControl,
} from './datepicker-base';

// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
@Component({
  selector: 'ngx-plusify-datetime-picker',
  template: '',
  exportAs: 'ngxPlusifyDatetimePicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    NGX_PLUSIFY_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
    {
      provide: NgxPlusifyDatepickerBase,
      useExisting: NgxPlusifyDatetimepicker,
    },
  ],
})
export class NgxPlusifyDatetimepicker<D> extends NgxPlusifyDatepickerBase<
  NgxPlusifyDatepickerControl<D>,
  D | null,
  D
> {}
