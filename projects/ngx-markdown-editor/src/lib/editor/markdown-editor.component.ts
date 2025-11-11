import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  HostBinding,
  input,
  Input,
  InputSignal,
  output,
  Output,
  signal,
  ViewChild,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
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

  /**
   * Ref to the internal preview component.
   */
  @ViewChild('markdownPreview')
  previewRef!: NgxMarkdownPreviewComponent;

  private isSyncing = signal(false);

  // ===========================================
  // Inputs
  // ===========================================

  /**
   * Main markdown content value.
   */
  @Input()
  value = '';

  /**
   * Theme customization input (CSS variables).
   */
  @Input()
  customTheme: Record<string, string> = {};

  // ===========================================
  // Signal Inputs
  // ===========================================

  /**
   * Configuration input (initialValue, readonly, etc.)
   */
  public config = input<MarkdownEditorConfig>({});

  /**
   * Controls the visibility of the preview pane.
   * @default true
   */
  public showPreviewInput = input<boolean>(true, { alias: 'showPreview' });

  /**
   * Controls the synchronization of scrolling between the editor and preview.
   * @default true
   */
  public syncScrollInput: InputSignal<boolean> = input<boolean>(true, { alias: 'syncScroll' });

  /**
   * Controls the visibility of the toolbar.
   * @default true
   */
  public showToolbarInput: InputSignal<boolean> = input<boolean>(true, { alias: 'showToolbar' });

  // ===========================================
  // Outputs
  // ===========================================

  @Output()
  valueChange = new EventEmitter<string>();

  // ==========================================
  // Signal Outputs
  // ==========================================

  /**
   * Output signal for preview visibility changes.
   * Emits a boolean indicating whether the preview is shown or hidden.
   */
  public showPreviewOutput = output<boolean>();

  /**
   * Output signal for scroll synchronization changes.
   * Emits a boolean indicating whether scroll synchronization is enabled or disabled.
   */
  public syncScrollOutput = output<boolean>();

  /**
   * Host theme class.
   */
  @HostBinding('class')
  get hostClass() {
    const config = this.internalConfig();
    const classes = ['plusify-markdown-editor-host'];

    if (config.useDefaultStyles) {
      classes.push('default-styles');
    }

    if (config.customStylesClass) {
      classes.push(config.customStylesClass);
    }

    return classes.join(' ');
  }

  /**
   * Style variables bound to host.
   */
  @HostBinding('style')
  get hostStyle(): Record<string, string> {
    const defaults: Record<string, string> = {
      '--md-color-primary': '#009b77',
      '--md-color-on-primary': '#ffffff',
      '--md-color-outline': '#e0e0e0',
      '--md-color-on-surface': '#222',
      '--md-color-on-surface-variant': '#666',
      '--md-color-primary-hover': '#007b5e',
      '--md-border-radius': '4px',
      '--md-spacing': '25px',
      '--md-font-family': 'monospace',
      '--md-font-size': '14px',
      '--md-line-height': '1.5',
    };
    return { ...defaults, ...this.customTheme };
  }

  /**
   * Internal config used after merging with defaults.
   */
  internalConfig = signal<Required<MarkdownEditorConfig>>(DEFAULT_EDITOR_CONFIG);

  constructor() {
    // Synchronization of config and inputs
    effect(() => {
      // Merge default config with user config first
      const baseConfig = {
        ...DEFAULT_EDITOR_CONFIG,
        ...this.config(),
      };

      // Then apply input signals, falling back to the merged config values
      const mergedConfig: Required<MarkdownEditorConfig> = {
        ...baseConfig,
        showPreview: this.showPreviewInput() ?? baseConfig.showPreview,
        syncScroll: this.syncScrollInput() ?? baseConfig.syncScroll,
        showToolbar: this.showToolbarInput() ?? baseConfig.showToolbar,
      };

      this.internalConfig.set(mergedConfig);

      if (mergedConfig.value && mergedConfig.value !== this.value) {
        this.value = mergedConfig.value;
      }
    });
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
    this.internalConfig.update((config) => ({ ...config, showPreview: value }));
    this.showPreviewOutput.emit(value);
  }

  /**
   * Toggles the synchronization of scrolling between the editor and preview.
   *
   * @param value - A boolean indicating whether to enable or disable sync scrolling.
   */
  handleToggleSyncScroll(value: boolean) {
    this.internalConfig.update((config) => ({ ...config, syncScroll: value }));
    this.syncScrollOutput.emit(value);
  }

  /**
   * Handles the scroll synchronization between the textarea and the preview pane.
   * If syncScroll is disabled or a synchronization is already in progress, the method exits early.
   *
   * @param ratio - The scroll ratio of the textarea, typically a value between 0 and 1.
   *                This ratio is used to calculate the corresponding scroll position in the preview pane.
   */
  handleTextareaScroll(ratio: number) {
    if (!this.internalConfig().syncScroll || this.isSyncing()) return;

    this.isSyncing.set(true);
    this.previewRef?.scrollTo(ratio);
    requestAnimationFrame(() => this.isSyncing.set(false));
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
    if (!this.internalConfig().syncScroll || this.isSyncing()) return;

    this.isSyncing.set(true);
    this.textareaRef?.scrollTo(ratio);
    requestAnimationFrame(() => this.isSyncing.set(false));
  }

  // ==========================================
  // Public Methods
  // ==========================================

  public getMarkdown(): string {
    return this.value;
  }

  public setMarkdown(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  public insertAtCursor(text: string): void {
    this.textareaRef?.insertTextAtCursor(text);
  }

  public clear(): void {
    this.setMarkdown('');
  }
}
