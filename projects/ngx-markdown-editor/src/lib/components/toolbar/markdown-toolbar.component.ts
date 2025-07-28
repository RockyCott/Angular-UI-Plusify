import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  InputSignal,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PopoverComponent, PopoverField } from './components/popover/popover.component';
import { DEFAULT_TOOLBAR_GROUPS, ToolbarItem } from './toolbar-items';

export interface MarkdownEditorTextarea {
  insertTextAtCursor(text: string): void;
  wrapSelection(before: string, after?: string): void;
  getSelectedText(): string;
  copyToClipboard(): void;
}

/**
 * NgxMarkdownToolbarComponent
 *
 * This component renders a set of markdown formatting tools as a toolbar.
 * It emits events to toggle scroll syncing and preview.
 * It accepts a reference to the NgxMarkdownTextareaComponent to apply formatting.
 */
@Component({
  selector: 'plusify-markdown-toolbar',
  templateUrl: './markdown-toolbar.component.html',
  styleUrls: ['./markdown-toolbar.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class NgxMarkdownToolbarComponent {
  /**
   * Groups of toolbar buttons to render.
   */
  itemGroups: ToolbarItem[][] = DEFAULT_TOOLBAR_GROUPS;

  /**
   * Reference to the textarea component.
   * It must implement insertTextAtCursor, wrapSelection, getSelectedText and copyToClipboard methods.
   */
  @Input() textarea!: MarkdownEditorTextarea;

  /**
   * Whether sync scroll is enabled.
   */
  syncScroll: InputSignal<boolean> = input<boolean>(true);

  /**
   * Whether preview panel is visible.
   */
  showPreview: InputSignal<boolean> = input<boolean>(true);

  /**
   * Emits when sync scroll is toggled.
   */
  @Output()
  toggleSyncScroll = new EventEmitter<boolean>();

  /**
   * Emits when preview panel is toggled.
   */
  @Output()
  togglePreview = new EventEmitter<boolean>();

  /**
   * Placeholder container for popovers (injected dynamically).
   */
  @ViewChild('popoverHost', { read: ViewContainerRef })
  popoverHost!: ViewContainerRef;

  /**
   * Handles click on any toolbar item.
   * @param item The toolbar item.
   * @param anchor The DOM element clicked.
   */
  onClick(item: ToolbarItem, anchor: HTMLElement) {
    if (item.action) {
      item.action(this, anchor);
    }
  }

  /**
   * Opens a popover with specific fields depending on the type.
   * @param type Type of popover (image, link, heading)
   * @param anchor DOM element to anchor the popover to
   * @returns A promise that resolves with the submitted fields
   */
  async openPopover(
    type: string,
    anchor: HTMLElement,
  ): Promise<Record<string, string> | string | null> {
    const fields = this.buildPopoverFields(type);

    return new Promise((resolve) => {
      this.popoverHost.clear();
      const ref = this.popoverHost.createComponent(PopoverComponent);

      ref.setInput('anchor', anchor);
      ref.setInput('type', type);
      ref.setInput('fields', fields);

      ref.instance.submit.subscribe((result) => {
        resolve(result);
        ref.destroy();
      });

      ref.instance.cancel.subscribe(() => {
        resolve(null);
        ref.destroy();
      });
    });
  }

  /**
   * Returns a list of fields to show in the popover, based on the type.
   */
  private buildPopoverFields(type: string): PopoverField[] {
    switch (type) {
      case 'image':
        return [
          { key: 'url', label: 'Image URL', placeholder: 'https://...' },
          { key: 'alt', label: 'Alt text', placeholder: 'Description' },
        ];
      case 'link':
        return [
          { key: 'url', label: 'Link URL', placeholder: 'https://...' },
          { key: 'text', label: 'Link text', placeholder: 'Text to display' },
        ];
      case 'heading':
        return [
          {
            key: 'level',
            label: 'Heading level',
            type: 'menu',
            options: Array.from({ length: 6 }, (_, i) => ({
              label: `Heading ${i + 1}`,
              value: String(i + 1),
            })),
          },
        ];
      default:
        return [];
    }
  }
}
