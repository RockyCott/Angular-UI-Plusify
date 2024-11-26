import { PlatformModule } from '@angular/cdk/platform';
import { importProvidersFrom, makeEnvironmentProviders, NgModule } from '@angular/core';
import { NgxPlusifyDateAdapter } from './date-adapter';
import { NGX_PLUSIFY_DATE_FORMATS } from './date-formats';
import { NgxPlusifyNativeDateAdapter } from './native-date-adapter';
import { NGX_PLUSIFY_NATIVE_DATE_FORMATS } from './native-date-formats';

@NgModule({
  imports: [PlatformModule],
  providers: [{ provide: NgxPlusifyDateAdapter, useClass: NgxPlusifyNativeDateAdapter }],
})
/**
 * @deprecated Use provideNgxNativeDate instead
 */
export class NgxNativeDateModule {}

@NgModule({
  imports: [NgxNativeDateModule],
  providers: [{ provide: NGX_PLUSIFY_DATE_FORMATS, useValue: NGX_PLUSIFY_NATIVE_DATE_FORMATS }],
})
/**
 * @deprecated Use provideNgxPlusifyNativeDate instead
 */
export class NgxPlusifyNativeDateModule {}

export function provideNgxNativeDate() {
  return makeEnvironmentProviders([
    importProvidersFrom(PlatformModule),
    { provide: NgxPlusifyDateAdapter, useClass: NgxPlusifyNativeDateAdapter },
  ]);
}

export function provideNgxPlusifyNativeDate() {
  return makeEnvironmentProviders([
    provideNgxNativeDate(),
    { provide: NGX_PLUSIFY_DATE_FORMATS, useValue: NGX_PLUSIFY_NATIVE_DATE_FORMATS },
  ]);
}
