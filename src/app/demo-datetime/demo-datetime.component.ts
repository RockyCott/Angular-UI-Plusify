import { Component, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {
  NgxPlusifyDatepickerActions,
  NgxPlusifyDatepickerApply,
  NgxPlusifyDatepickerCancel,
  NgxPlusifyDatepickerInput,
  NgxPlusifyDatepickerToggle,
  NgxPlusifyDatetimepicker,
} from 'projects/datetime-picker/src';
import { NgxPlusifyHighlightDirective } from '../shared/NgxMatHighlightDirective';

@Component({
  selector: 'app-demo-datetime',
  templateUrl: './demo-datetime.component.html',
  styleUrls: ['./demo-datetime.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    NgxPlusifyDatepickerActions,
    NgxPlusifyDatepickerApply,
    NgxPlusifyDatepickerCancel,
    NgxPlusifyDatepickerInput,
    NgxPlusifyDatepickerToggle,
    NgxPlusifyDatetimepicker,
    NgxPlusifyHighlightDirective,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})
export class DemoDatetimeComponent {
  pickerElement = viewChild(NgxPlusifyDatetimepicker);

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;

  public dateControl = new FormControl<Date>(null);

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  public code1 = 'npm install --save @angular-ui-plusify/datetime-picker';

  public code3 = `<mat-form-field>
  <input matInput [ngxPlusifyDatetimePicker]="picker" placeholder="Choose a date" [formControl]="dateControl"
    [min]="minDate" [max]="maxDate" [disabled]="disabled">
  <ngx-plusify-datepicker-toggle matSuffix [for]="picker"></ngx-plusify-datepicker-toggle>
  <ngx-plusify-datetime-picker #picker [showSpinners]="showSpinners" [showSeconds]="showSeconds"
    [stepHour]="stepHour" [stepMinute]="stepMinute" [stepSecond]="stepSecond" [touchUi]="touchUi"
    [color]="color" [enableMeridian]="enableMeridian" [disableMinute]="disableMinute" [hideTime]="hideTime">
  </ngx-plusify-datetime-picker>
</mat-form-field>`;

  public code2 = `import {
           NgxPlusifyDatetimePickerComponent,
           NgxPlusifyNativeDateComponent,
           NgxPlusifyTimepickerComponent
  } from '@angular-ui-plusify/datetime-picker';

@Component({
  imports: [
    ...
    NgxPlusifyDatetimePickerComponent,
    NgxPlusifyTimepickerComponent,
    NgxPlusifyNativeDateComponent,
    ...
  ]
})
export class AppComponent { }`;
  public code4 = 'npm install --save  @angular-ui-plusify/moment-adapter';
  public code5 = `@Injectable()
export class CustomDateAdapter extends NgxPlusifyDateAdapter<D> {...}
// D can be Date, Moment or customized type`;

  public code6 = `@Component({
  providers: [
    {
      provide: NgxPlusifyDateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_PLUSIFY_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ],
})
export class CustomDateComponent { }`;

  public code7 = `// If using Moment
const CUSTOM_DATE_FORMATS: NgxPlusifyDateFormats = {
  parse: {
    dateInput: "l, LTS"
  },
  display: {
    dateInput: "l, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

//and in the module providers
providers: [
    { provide: NGX_PLUSIFY_DATE_FORMATS, useValue: CUSTOM_MOMENT_FORMATS }
  ]`;

  public code8 =
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet">';

  public code9 = `<mat-form-field>
  <input matInput [ngxPlusifyDatetimePicker]="pickerCustomIcon" placeholder="Choose a date"
    [formControl]="dateControl" [min]="minDate" [max]="maxDate" [disabled]="disabled">
  <ngx-plusify-datepicker-toggle matSuffix [for]="pickerCustomIcon"></ngx-plusify-datepicker-toggle>
  <ngx-plusify-datetime-picker #pickerCustomIcon [showSpinners]="showSpinners" [showSeconds]="showSeconds"
    [stepHour]="stepHour" [stepMinute]="stepMinute" [stepSecond]="stepSecond" [touchUi]="touchUi"
    [color]="color" [enableMeridian]="enableMeridian" [disableMinute]="disableMinute" [hideTime]="hideTime">
    <ngx-plusify-datepicker-actions>
      <button mat-button ngxPlusifyDatepickerCancel>Cancel</button>
      <button mat-raised-button color="primary" ngxPlusifyDatepickerApply>Apply</button>
    </ngx-plusify-datepicker-actions>
  </ngx-plusify-datetime-picker>
</mat-form-field>`;

  public code10 = `<mat-form-field>
<input matInput [ngxPlusifyDatetimePicker]="pickerCustomIcon" placeholder="Choose a date"
  [formControl]="dateControl" [min]="minDate" [max]="maxDate" [disabled]="disabled">
<ngx-plusify-datepicker-toggle matSuffix [for]="pickerCustomIcon">
  <mat-icon ngxPlusifyDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
</ngx-plusify-datepicker-toggle>
<ngx-plusify-datetime-picker #pickerCustomIcon [showSpinners]="showSpinners" [showSeconds]="showSeconds"
  [stepHour]="stepHour" [stepMinute]="stepMinute" [stepSecond]="stepSecond" [touchUi]="touchUi"
  [color]="color" [enableMeridian]="enableMeridian" [disableMinute]="disableMinute" [hideTime]="hideTime">
</ngx-plusify-datetime-picker>
</mat-form-field>`;

  toggleMinDate(evt: any) {
    if (evt.checked) {
      this._setMinDate();
    } else {
      this.minDate = null;
    }
  }

  toggleMaxDate(evt: any) {
    if (evt.checked) {
      this._setMaxDate();
    } else {
      this.maxDate = null;
    }
  }

  closePicker() {
    this.pickerElement().close();
  }

  private _setMinDate() {
    const now = new Date();
    this.minDate = new Date();
    this.minDate.setDate(now.getDate() - 1);
  }

  private _setMaxDate() {
    const now = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(now.getDate() + 1);
  }
}
