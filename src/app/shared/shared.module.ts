import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPlusifyHighlightDirective } from './NgxPlusifyHighlightDirective';


@NgModule({
  imports: [MatTabsModule],
  declarations: [NgxPlusifyHighlightDirective],
  exports: [NgxPlusifyHighlightDirective, MatTabsModule]
})
export class SharedModule { }
