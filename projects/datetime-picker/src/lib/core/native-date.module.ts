

import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NgxPlusifyDateAdapter } from './date-adapter';
import { NgxPlusifyNativeDateAdapter } from './native-date-adapter';
import { NGX_PLUSIFY_NATIVE_DATE_FORMATS } from './native-date-formats';
import { NGX_PLUSIFY_DATE_FORMATS } from './date-formats';


@NgModule({
    imports: [PlatformModule],
    providers: [
        { provide: NgxPlusifyDateAdapter, useClass: NgxPlusifyNativeDateAdapter },
    ],
})
export class NgxNativeDateModule { }

@NgModule({
    imports: [NgxNativeDateModule],
    providers: [{ provide: NGX_PLUSIFY_DATE_FORMATS, useValue: NGX_PLUSIFY_NATIVE_DATE_FORMATS }],
})
export class NgxPlusifyNativeDateModule { }
