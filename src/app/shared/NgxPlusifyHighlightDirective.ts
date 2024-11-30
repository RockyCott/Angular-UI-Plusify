import { AfterViewInit, Directive, ElementRef } from "@angular/core";
import hljs from "highlight.js";

@Directive({
  selector: "code[ngxPlusifyHighlight]",
  standalone: true,
})
export class NgxPlusifyHighlightDirective implements AfterViewInit {
  constructor(private eltRef: ElementRef) {}

  ngAfterViewInit() {
    hljs.highlightElement(this.eltRef.nativeElement);
  }
}
