/**
 * Configuration options for the Markdown Editor component.
 */
export interface MarkdownEditorConfig {
  /**
   * Determines whether the preview pane is displayed alongside the editor.
   * Optional. Defaults to `false`.
   */
  showPreview?: boolean;

  /**
   * Determines whether the toolbar is displayed above the editor.
   * Optional. Defaults to `true`.
   */
  showToolbar?: boolean;

  /**
   * Enables or disables synchronized scrolling between the editor and the preview pane.
   * Optional. Defaults to `true`.
   */
  syncScroll?: boolean;

  /**
   * The initial value of the editor content.
   * Optional.
   */
  value?: string;

  /**
   * Sets the editor to read-only mode, preventing user input.
   * Optional. Defaults to `false`.
   */
  readonly?: boolean;

  /**
   * Disables the sanitizer for the editor content, allowing raw HTML to be rendered.
   * Use with caution to avoid security risks.
   * Optional. Defaults to `false`.
   */
  disableSanitizer?: boolean;
}
