import { Directive, ElementRef, AfterViewInit } from '@angular/core';
// import * as hljs from 'highlight.js';
var hljs = require('highlight.js/lib/common');

@Directive({
    selector: 'code[ngxPlusifyHighlight]'
})
export class NgxPlusifyHighlightDirective implements AfterViewInit {
    constructor(private eltRef: ElementRef) {
    }
    ngAfterViewInit() {
        (hljs as any).highlightBlock(this.eltRef.nativeElement);
    }
}
