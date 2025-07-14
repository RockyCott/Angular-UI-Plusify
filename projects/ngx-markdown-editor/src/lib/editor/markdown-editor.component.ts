import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  HostBinding,
  input,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { swingFromRight } from '../animations/swing.animation';
import { NgxMarkdownPreviewComponent } from '../components/preview/preview.component';
import { NgxMarkdownTextareaComponent } from '../components/textarea/markdown-textarea.component';
import { NgxMarkdownToolbarComponent } from '../components/toolbar/markdown-toolbar.component';
import { DEFAULT_EDITOR_CONFIG } from '../config/default-editor-config';
import { MarkdownEditorConfig } from '../types/config.interface';

/**
 * NgxMarkdownEditorComponent
 *
 * A customizable markdown editor component with toolbar and live preview.
 * Allows theming via CSS variables and accepts an optional config input.
 */
@Component({
  selector: 'plusify-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  animations: [swingFromRight],
  imports: [
    CommonModule,
    NgxMarkdownToolbarComponent,
    NgxMarkdownTextareaComponent,
    NgxMarkdownPreviewComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * The `NgxMarkdownEditorComponent` is a customizable Markdown editor component
 * designed for Angular applications. It provides features such as live preview,
 * toolbar controls, and configurable themes. The component allows for seamless
 * integration with Markdown content and offers flexibility through various inputs
 * and outputs.
 *
 * ### Features:
 * - **Markdown Content Management**: Bind and update Markdown content using the `value` input and `valueChange` output.
 * - **Theme Customization**: Apply custom CSS variables via the `customTheme` input.
 * - **Configurable Behavior**: Control editor settings like preview visibility, toolbar display, scroll synchronization, and sanitizer usage.
 * - **Dynamic Styling**: Automatically bind theme classes and styles to the host element.
 *
 * ### Inputs:
 * - `value`: The main Markdown content value.
 * - `customTheme`: A record of CSS variables for theme customization.
 * - `themeClass`: A class applied to the host element for theme styling.
 * - `config`: Configuration options for the editor, such as initial values and readonly mode.
 * - `showPreviewInput`: Controls the visibility of the preview pane.
 * - `showToolbarInput`: Controls the visibility of the toolbar.
 * - `syncScrollInput`: Enables or disables synchronized scrolling between the editor and preview.
 * - `disableSanitizerInput`: Disables the sanitizer for Markdown content.
 *
 * ### Outputs:
 * - `valueChange`: Emits the updated Markdown content whenever changes occur.
 *
 * ### Methods:
 * - `handleValueChange(value: string)`: Handles changes from the internal textarea and updates the `value` property.
 * - `handleTogglePreview(value: boolean)`: Toggles the visibility of the preview pane.
 * - `handleToggleSyncScroll(value: boolean)`: Toggles synchronized scrolling between the editor and preview.
 *
 * ### Host Bindings:
 * - `hostClass`: Dynamically binds the `themeClass` to the host element.
 * - `hostStyle`: Dynamically binds style variables for theme customization to the host element.
 *
 * ### Internal Behavior:
 * - Synchronizes configuration inputs with internal signals using reactive effects.
 * - Merges default configuration with user-provided settings.
 * - Provides default theme styles and allows overriding via `customTheme`.
 *
 * This component is ideal for applications requiring a rich Markdown editing experience
 * with customizable themes and behavior.
 */
export class NgxMarkdownEditorComponent {
  /**
   * Ref to the internal textarea component.
   */
  @ViewChild('textareaRef')
  textareaRef!: NgxMarkdownTextareaComponent;

  @ViewChild('markdownPreview')
  previewRef!: NgxMarkdownPreviewComponent;

  private isSyncing = false;

  /**
   * Main markdown content value.
   */
  @Input()
  value = '';

  @Output()
  valueChange = new EventEmitter<string>();

  /**
   * Configuration input (initialValue, readonly, etc.)
   */
  readonly config = input<MarkdownEditorConfig>({});

  /**
   * Theme customization input (CSS variables).
   */
  @Input()
  customTheme: Record<string, string> = {};

  /**
   * Host theme class.
   */
  @Input()
  themeClass = '';

  @HostBinding('class')
  get hostClass() {
    return this.themeClass;
  }

  /**
   * Style variables bound to host.
   */
  @HostBinding('style')
  get hostStyle(): Record<string, string> {
    const defaults = {
      '--color-primary': '#009b77',
      '--color-on-primary': '#ffffff',
      '--color-outline': '#e0e0e0',
      '--color-on-surface': '#222',
      '--color-on-surface-variant': '#666',
      '--color-primary-hover': '#007b5e',
    };
    return { ...defaults, ...this.customTheme };
  }

  /**
   * Internal config used after merging with defaults.
   */
  internalConfig: MarkdownEditorConfig = { ...DEFAULT_EDITOR_CONFIG };

  constructor() {
    // Sincronización de config e inputs
    effect(() => {
      this.internalConfig = {
        ...DEFAULT_EDITOR_CONFIG,
        ...this.config(),
      };

      if (this.internalConfig.value) {
        this.setValue(this.internalConfig.value);
      }
    });
  }

  /**
   * Sets the initial editor value.
   */
  private setValue(value: string) {
    this.value = value || '';
  }

  /**
   * Handles changes from internal textarea.
   */
  handleValueChange(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }

  /**
   * Handlers from toolbar events.
   */
  handleTogglePreview(value: boolean) {
    this.internalConfig.showPreview = value;
  }

  /**
   * Toggles the synchronization of scrolling between the editor and preview.
   * 
   * @param value - A boolean indicating whether to enable or disable sync scrolling.
   */
  handleToggleSyncScroll(value: boolean) {
    this.internalConfig.syncScroll = value;
  }

  /**
   * Handles the scroll synchronization between the textarea and the preview pane.
   * If syncScroll is disabled or a synchronization is already in progress, the method exits early.
   * 
   * @param ratio - The scroll ratio of the textarea, typically a value between 0 and 1.
   *                This ratio is used to calculate the corresponding scroll position in the preview pane.
   */
  handleTextareaScroll(ratio: number) {
    if (!this.internalConfig.syncScroll || this.isSyncing) return;

    this.isSyncing = true;
    this.previewRef?.scrollTo(ratio);
    requestAnimationFrame(() => (this.isSyncing = false));
  }

  /**
   * Handles the synchronization of scrolling between the preview and the textarea.
   * If the `syncScroll` configuration is disabled or a scroll synchronization is already in progress,
   * the method exits early.
   *
   * @param ratio - The scroll ratio (a value between 0 and 1) representing the position
   *                of the preview scroll relative to its total height.
   */
  handlePreviewScroll(ratio: number) {
    if (!this.internalConfig.syncScroll || this.isSyncing) return;

    this.isSyncing = true;
    this.textareaRef?.scrollTo(ratio);
    requestAnimationFrame(() => (this.isSyncing = false));
  }
}
