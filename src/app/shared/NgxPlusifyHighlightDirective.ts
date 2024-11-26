import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import hljs from "highlight.js";


@Directive({
    selector: 'code[ngxPlusifyHighlight]'
})
export class NgxPlusifyHighlightDirective implements AfterViewInit {
    constructor(private eltRef: ElementRef) {
    }
    ngAfterViewInit() {
        hljs.highlightBlock(this.eltRef.nativeElement);
    }
}
