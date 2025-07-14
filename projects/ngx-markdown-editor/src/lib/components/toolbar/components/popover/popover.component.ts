import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  input,
  Input,
  InputSignal,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface PopoverField {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'menu';
  options?: { label: string; value: string }[];
}

/**
 * PopoverComponent
 * 
 * A reusable popover component that displays a form with various input fields.
 * Supports dynamic fields, menu options, and emits events on submit or cancel.
 * It can be used for various purposes like inserting links, images, or headings in a markdown editor.
 */
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [
    trigger('popoverFade', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      transition('void => *', animate('200ms ease-out')),
      transition('* => void', animate('150ms ease-in')),
    ]),
  ],
  imports: [CommonModule, FormsModule],
})
export class PopoverComponent implements AfterViewInit {
  /**
   * Fields to render in the popover form.
   */
  fields: InputSignal<PopoverField[]> = input<PopoverField[]>([]);

  /**
   * Reference to the anchor element used for popover positioning.
   */
  @Input()
  anchor!: HTMLElement;

  /**
   * Event emitted when the user submits the form.
   */
  @Output()
  submit = new EventEmitter<Record<string, string>>();

  /**
   * Event emitted when the popover is cancelled or dismissed.
   */
  @Output()
  cancel = new EventEmitter<void>();

  /**
   * Internal form data model.
   */
  formData: Record<string, string> = {};

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.positionPopover(), 0);
  }

  /**
   * Positions the popover relative to the anchor element.
   */
  private positionPopover(): void {
    const rect = this.anchor.getBoundingClientRect();
    const popover = this.elementRef.nativeElement.querySelector('.plusify-popover') as HTMLElement;
    if (popover) {
      popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
      popover.style.left = `${rect.left + window.scrollX}px`;
    }
  }

  /**
   * Emits the current form data on submit.
   */
  onSubmit(): void {
    this.submit.emit(this.formData);
  }

  /**
   * Emits cancel event to close the popover.
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Emits a submit event immediately when a menu option is selected.
   */
  submitMenuSelection(key: string, value: string): void {
    const result: Record<string, string> = {};
    result[key] = value;
    this.submit.emit(result);
  }

  /**
   * Checks if all fields are of type "menu".
   */
  isMenuOnly(): boolean {
    return this.fields().every((f) => f.type === 'menu');
  }

  /**
   * Closes the popover if the user clicks outside of it and the anchor.
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const popover = this.elementRef.nativeElement.querySelector('.plusify-popover');
    if (
      popover &&
      !popover.contains(event.target as Node) &&
      !this.anchor.contains(event.target as Node)
    ) {
      this.cancel.emit();
    }
  }
}
