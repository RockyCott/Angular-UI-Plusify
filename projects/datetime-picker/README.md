# Angular UI Plusify DatetimePicker for @angular/material 16.x

## Description

A DatetimePicker like @angular/material [Datepicker](https://material.angular.io/components/datepicker/overview) by adding support for choosing time.

This component is based on the original [`@angular-material-components/datetime-picker`](https://github.com/h2qutc/angular-material-components) but modernized for **Angular 16+**. This ensures compatibility and support for the latest Angular Material updates, providing developers with a reliable, up-to-date solution.

## DEMO

Choose the version corresponding to your Angular version:

 Angular     | @angular-ui-plusify/datetime-picker
 ----------- | -------------------
 16          | 0.0.1+

## Getting started

```
npm install --save  @angular-ui-plusify/datetime-picker
```

## Setup
Basically the same way the @angular/material Datepicker is configured and imported.

```
import { NgxPlusifyDatetimePickerModule, NgxPlusifyTimepickerModule } from '@angular-ui-plusify/datetime-picker';
@NgModule({
   ...
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatDatepickerModule,
      MatInputModule,
      NgxPlusifyTimepickerModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      NgxPlusifyDatetimePickerModule,
   ],
   ...
})
export class AppModule { }
```
@see [src/app/demo-datetime/demo-datetime.module.ts](src/app/demo-datetime/demo-datetime.module.ts)

## Using the component

The same API as @angular/material Datepicker (@see [API docs](https://material.angular.io/components/datepicker/api))

### Datetime Picker (ngx-plusify-datetime-picker)

```
<mat-form-field>
   <input matInput [ngxplusifyDatetimePicker]="picker" placeholder="Choose a date" [formControl]="dateControl"
      [min]="minDate" [max]="maxDate" [disabled]="disabled">
   <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
   <ngx-plusify-datetime-picker #picker [showSpinners]="showSpinners" [showSeconds]="showSeconds"
      [stepHour]="stepHour" [stepMinute]="stepMinute" [stepSecond]="stepSecond"
      [touchUi]="touchUi" [color]="color" [enableMeridian]="enableMeridian" 
      [disableMinute]="disableMinute" [hideTime]="hideTime">
   </ngx-plusify-datetime-picker>
</mat-form-field>
```

### Timepicker (ngx-plusify-timepicker)

```
<ngx-plusify-timepicker [(ngModel)]="date"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [(ngModel)]="date" [disabled]="disabled"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [(ngModel)]="date" [stepHour]="2" [stepMinute]="5" [stepSecond]="10"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [(ngModel)]="date" [showSpinners]="showSpinners"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [(ngModel)]="date" [showSeconds]="showSeconds"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [(ngModel)]="date" [disableMinute]="disableMinute"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [(ngModel)]="date" [defaultTime]="defaultTime"></ngx-plusify-timepicker>
<ngx-plusify-timepicker [formControl]="formControl"></ngx-plusify-timepicker>
```

#### List of @Input of ngx-plusify-timepicker

*You can use all @Input of ngx-plusify-timepicker for ngx-plusify-datetime-picker*

| @Input        	| Type     	| Default value 	| Description                                                          	|
|---------------	|----------	|---------------	|----------------------------------------------------------------------	|
| **disabled**      	| boolean  	| null          	| If true, the picker is readonly and can't be modified                	|
| **showSpinners**  	| boolean  	| true          	| If true, the spinners above and below input are visible              	|
| **showSeconds** 	| boolean  	| true          	| If true, it is not possible to select seconds                        	|
| **disableMinute** 	| boolean  	| false          	| If true, the minute (and second) is readonly                        	|
| **defaultTime** 	| Array  	| undefined          	| An array [hour, minute, second] for default time when the date is not yet defined                        	|
| **stepHour**      	| number   	| 1             	| The number of hours to add/substract when clicking hour spinners     	|
| **stepMinute**    	| number   	| 1             	| The number of minutes to add/substract when clicking minute spinners 	|
| **stepSecond**    	| number   	| 1             	| The number of seconds to add/substract when clicking second spinners 	|
| **color**    	   | ThemePalette   	| undefined             	| Color palette to use on the datepicker's calendar. 	|
| **enableMeridian** | boolean   	| false             	| Whether to display 12H or 24H mode. 	|
| **hideTime** | boolean   	| false             	| If true, the time is hidden. 	|
| **touchUi**    	   | boolean   | false           | Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather than a popup and elements have more padding to allow for bigger touch targets. 	|

## Choosing a date implementation and date format settings

The datepicker was built to be date implementation agnostic. This means that it can be made to work with a variety of different date implementations. However it also means that developers need to make sure to provide the appropriate pieces for the datepicker to work with their chosen implementation.

The easiest way to ensure this is to import one of the provided date modules:

|                       	| **NgxPlusifyNativeDateModule** 	| **NgxPlusifyMomentModule**                                                              	|
|-----------------------	|----------------------------	|-------------------------------------------------------------------------------------	|
| **Date type**         	| Date                       	| Moment                                                                              	|
| **Supported locales** 	| en-US                      	| [See project for details](https://github.com/moment/moment/tree/develop/src/locale) 	|
| **Dependencies**      	| None                       	| [Moment.js](https://momentjs.com/)                                                  	|
| **Import from**       	| @angular-ui-plusify/datetime-picker    	| [@angular-ui-plusify/moment-adapter](https://www.npmjs.com/package/@angular-ui-plusify/moment-adapter)      	|

To use NgxPlusifyMomentModule: 
   ```
   npm install --save  @angular-ui-plusify/moment-adapter
   ```

Please note: NgxPlusifyNativeDateModule is based off the functionality available in JavaScript's native Date object. Thus it is not suitable for many locales. One of the biggest shortcomings of the native Date object is the inability to set the parse format.

We highly recommend using the **NgxPlusifyMomentModule** or a custom **NgxPlusifyDateAdapter** that works with the formatting/parsing library of your choice.

For example:

Creating a custom date adapter:

```
@Injectable()
export class CustomDateAdapter extends NgxPlusifyDateAdapter<D> {...}
// D can be Date, Moment or customized type
```

Creating a custom date adapter module
```
@NgModule({
  providers: [
    {
      provide: NgxPlusifyDateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_PLUSIFY_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ],
})
export class CustomDateModule { }
```

You can also customize the date format by providing your custom NGX_PLUSIFY_DATE_FORMATS in your module.

```
// If using Moment
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
  ]
```

## Theming
- @see @angular/material [Using a pre-built theme](https://material.angular.io/guide/theming#using-a-pre-built-theme)
- Add the Material Design icon font to your index.html
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet">
```

## License
MIT