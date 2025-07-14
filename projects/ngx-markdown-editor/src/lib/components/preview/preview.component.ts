import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, Input, InputSignal, output, ViewChild } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

/**
 * NgxMarkdownPreviewComponent
 *
 * Displays rendered markdown content using ngx-markdown.
 * Supports KaTeX math rendering and clipboard functionality.
 */
@Component({
  selector: 'plusify-markdown-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss', './preview-theme.scss'],
  imports: [CommonModule, MarkdownComponent],
})
/**
 * A component for rendering a markdown preview with optional scrolling and sanitizer control.
 * 
 * @remarks
 * This component allows rendering markdown content in a preview area. It provides
 * functionality to handle scrolling events and control whether Angular's default DOM
 * sanitizer is disabled for rendering trusted raw HTML inside markdown.
 * 
 * @example
 * ```html
 * <ngx-markdown-preview
 *   [content]="markdownContent"
 *   [disableSanitizer]="true"
 *   (scrolled)="onScroll($event)">
 * </ngx-markdown-preview>
 * ```
 * 
 * @property content - The markdown content to be rendered in the preview.
 * @property disableSanitizer - A flag to disable Angular's default DOM sanitizer.
 * @property scrolled - An output signal that emits the scroll ratio of the preview area.
 * 
 * @method onScroll - Handles the scroll event and emits the scroll ratio.
 * @method scrollTo - Scrolls the preview area to a specific ratio.
 * 
 * @decorator @ViewChild('preview', { static: true }) - References the preview element in the DOM.
 */
export class NgxMarkdownPreviewComponent {
  /**
   * Markdown content to be rendered in the preview.
   */
  content: InputSignal<string> = input<string>('');

  /**
   * Whether to disable Angular’s default DOM sanitizer.
   * This can be useful for rendering trusted raw HTML inside markdown.
   */
  disableSanitizer: InputSignal<boolean> = input<boolean>(false);

  public scrolled = output<number>();

  @ViewChild('preview', { static: true })
  previewEl!: ElementRef<HTMLDivElement>;

  /**
   * Handles the scroll event on the preview element and calculates the scroll ratio.
   * Emits the calculated scroll ratio as a value between 0 and 1.
   *
   * The scroll ratio is determined by dividing the current scroll position (`scrollTop`)
   * by the difference between the total scrollable height (`scrollHeight`) and the visible height (`clientHeight`).
   *
   * @emits scrolled - Emits the scroll ratio as a number between 0 and 1.
   */
  onScroll(): void {
    const el = this.previewEl.nativeElement;
    const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight);
    this.scrolled.emit(ratio);
  }

  /**
   * Scrolls the preview element to a specific position based on the provided ratio.
   * 
   * @param ratio - A number between 0 and 1 representing the scroll position as a percentage.
   *                For example, 0 scrolls to the top, 1 scrolls to the bottom, and 0.5 scrolls to the middle.
   */
  public scrollTo(ratio: number): void {
    const el = this.previewEl.nativeElement;
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
  }
}
