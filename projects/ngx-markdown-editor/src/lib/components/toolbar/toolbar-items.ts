import { insertHeading, insertImage, insertLink } from './actions/toolbar-actions';
import { NgxMarkdownToolbarComponent } from './markdown-toolbar.component';

export interface ToolbarItem {
  type: string;
  title: string;
  iconHtml?: string;
  iconFont?: string;
  action: (toolbar: NgxMarkdownToolbarComponent, anchor?: HTMLElement) => void | Promise<void>;
}

export const DEFAULT_TOOLBAR_GROUPS: ToolbarItem[][] = [
  [
    {
      type: 'heading',
      title: 'Heading',
      iconHtml: 'H',
      action: insertHeading,
    },
    {
      type: 'bold',
      title: 'Bold',
      iconFont: 'format_bold',
      action: (tb) => tb.textarea.wrapSelection('**'),
    },
    {
      type: 'italic',
      title: 'Italic',
      iconFont: 'format_italic',
      action: (tb) => tb.textarea.wrapSelection('_'),
    },
    {
      type: 'strike',
      title: 'Strikethrough',
      iconFont: 'strikethrough_s',
      action: (tb) => tb.textarea.wrapSelection('~~'),
    },
  ],
  [
    {
      type: 'line',
      title: 'Line',
      iconHtml: '<strong>—</strong>',
      action: (tb) => tb.textarea.insertTextAtCursor('\n---\n'),
    },
    {
      type: 'blockquote',
      title: 'Quote',
      iconFont: 'format_quote',
      action: (tb) => tb.textarea.wrapSelection('> ', ''),
    },
  ],
  [
    {
      type: 'unordered-list',
      title: 'Unordered List',
      iconFont: 'format_list_bulleted',
      action: (tb) => tb.textarea.wrapSelection('- ', ''),
    },
    {
      type: 'ordered-list',
      title: 'Ordered List',
      iconFont: 'format_list_numbered',
      action: (tb) => tb.textarea.wrapSelection('1. ', ''),
    },
    {
      type: 'task-list',
      title: 'Task List',
      iconFont: 'check_box',
      action: (tb) => tb.textarea.wrapSelection('\n- [ ] ', ''),
    },
  ],
  [
    {
      type: 'table',
      title: 'Table',
      iconFont: 'table',
      action: (tb) =>
        tb.textarea.insertTextAtCursor(`\n\n| Col 1 | Col 2 |\n|-------|-------|\n| Val 1 | Val 2 |\n`),
    },
    {
      type: 'image',
      title: 'Image',
      iconFont: 'image',
      action: insertImage,
    },
    {
      type: 'link',
      title: 'Link',
      iconFont: 'link',
      action: insertLink,
    },
  ],
  [
    {
      type: 'code',
      title: 'Inline Code',
      iconFont: 'code',
      action: (tb) => tb.textarea.wrapSelection('`'),
    },
    {
      type: 'codeblock',
      title: 'Code Block',
      iconFont: 'code_blocks',
      action: (tb) => tb.textarea.insertTextAtCursor('\n```\ncode\n```\n'),
    },
  ],
];
