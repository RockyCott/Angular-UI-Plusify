/** @docs-private */
export function createMissingDateImplError(provider: string) {
  return Error(
    `NgxPlusifyDatetimePicker: No provider found for ${provider}. You must import one of the following ` +
      `modules at your application root: NgxPlusifyNativeDateModule, NgxPlusifyMomentDateModule, or provide a ` +
      `custom implementation.`,
  );
}
