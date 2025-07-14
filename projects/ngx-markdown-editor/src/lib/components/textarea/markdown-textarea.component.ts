import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Input,
  InputSignal,
  output,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * NgxMarkdownTextareaComponent
 *
 * Handles all text manipulation logic for the markdown editor.
 * Provides utility functions to insert, wrap, and read text at the cursor position.
 */
@Component({
  selector: 'plusify-markdown-textarea',
  templateUrl: './markdown-textarea.component.html',
  styleUrls: ['./markdown-textarea.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class NgxMarkdownTextareaComponent {
  /**
   * Current textarea value.
   */
  @Input()
  value = '';

  /**
   * Whether the textarea is readonly.
   */
  readonly: InputSignal<boolean> = input<boolean>(false);

  /**
   * Emits whenever the value is updated programmatically or by the user.
   */
  @Output()
  valueChange = new EventEmitter<string>();

  /**
   * Reference to the native textarea element.
   */
  @ViewChild('textarea', { static: true })
  textareaEl!: ElementRef<HTMLTextAreaElement>;

  /**
   * Emits the current scroll position of the textarea as a number.
   * This can be used to track or synchronize scrolling behavior.
   */
  public scrolled = output<number>();

  /**
   * Inserts the given text at the current cursor position.
   * @param text The text to insert.
   */
  insertTextAtCursor(text: string) {
    const el = this.textareaEl.nativeElement;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = this.value.slice(0, start);
    const after = this.value.slice(end);

    this.value = before + text + after;
    this.valueChange.emit(this.value);

    // Restore focus and move cursor
    setTimeout(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + text.length;
    });
  }

  /**
   * Wraps the currently selected text with the provided strings.
   * @param before Text to add before the selection.
   * @param after Text to add after the selection (defaults to 'before').
   */
  wrapSelection(before: string, after = before) {
    const el = this.textareaEl.nativeElement;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    const selected = this.value.slice(start, end);
    const wrapped = `${before}${selected}${after}`;
    this.value = this.value.slice(0, start) + wrapped + this.value.slice(end);
    this.valueChange.emit(this.value);

    setTimeout(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = end + before.length;
    });
  }

  /**
   * Returns the text currently selected by the user.
   */
  getSelectedText(): string {
    const el = this.textareaEl.nativeElement;
    return this.value.substring(el.selectionStart, el.selectionEnd);
  }

  /**
   * Handles the 'Tab' keypress to insert a tab character instead of focusing another element.
   * @param event The keyboard event.
   */
  onTabKeyPress(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.insertTextAtCursor('\t');
    }
  }

  /**
   * Copies the current value to the clipboard.
   */
  copyToClipboard() {
    navigator.clipboard.writeText(this.value);
  }

  /**
   * Synchronizes scroll position between editor and preview pane.
   * Calculates scroll ratio of source and applies it to target element.
   *
   * @param sourceTag - Either 'editor' or 'preview', indicating the source of the scroll
   */
  onScroll() {
    const el = this.textareaEl.nativeElement;
    const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight);
    this.scrolled.emit(ratio);
  }

  /**
   * Scrolls the textarea element to a specific position based on the provided ratio.
   * The ratio determines the vertical scroll position as a fraction of the total scrollable height.
   *
   * @param ratio - A number between 0 and 1 representing the scroll position as a percentage
   *                of the total scrollable height. For example, 0 scrolls to the top, 0.5 scrolls
   *                to the middle, and 1 scrolls to the bottom.
   */
  public scrollTo(ratio: number) {
    const el = this.textareaEl.nativeElement;
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
  }
}
