import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-demo-datetime',
  templateUrl: './demo-datetime.component.html',
  styleUrls: ['./demo-datetime.component.scss'],
})
export class DemoDatetimeComponent implements OnInit {
  @ViewChild('picker', { static: true }) picker: any;

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

  public dateControl = new FormControl(new Date());

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
           NgxPlusifyDatetimePickerModule, 
           NgxPlusifyNativeDateModule, 
           NgxPlusifyTimepickerModule 
  } from '@angular-ui-plusify/datetime-picker';
  
@NgModule({
  imports: [
    ...
    NgxPlusifyDatetimePickerModule,
    NgxPlusifyTimepickerModule,
    NgxPlusifyNativeDateModule,
    ...
  ]
})
export class AppModule { }`;
  public code4 = 'npm install --save  @angular-ui-plusify/moment-adapter';
  public code5 = `@Injectable()
export class CustomDateAdapter extends NgxPlusifyDateAdapter<D> {...}
// D can be Date, Moment or customized type`;

  public code6 = `@NgModule({
  providers: [
    {
      provide: NgxPlusifyDateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_PLUSIFY_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ],
})
export class CustomDateModule { }`;

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

  constructor() {}

  ngOnInit() {
    // this.picker.closedStream.subscribe(() => {
    //   console.log('closed');
    // })
    // this.picker.openedStream.subscribe(() => {
    //   console.log('opened');
    // })
  }

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
    this.picker.cancel();
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
