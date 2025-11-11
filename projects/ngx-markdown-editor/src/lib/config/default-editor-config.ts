import { MarkdownEditorConfig } from '../types/config.interface';

export const DEFAULT_EDITOR_CONFIG: Required<MarkdownEditorConfig> = {
  showPreview: true,
  showToolbar: true,
  syncScroll: true,
  value: '',
  readonly: false,
  disableSanitizer: false,
  useDefaultStyles: true,
  customStylesClass: '',
};
