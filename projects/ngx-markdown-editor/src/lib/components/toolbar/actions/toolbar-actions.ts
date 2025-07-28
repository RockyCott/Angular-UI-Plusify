import { NgxMarkdownToolbarComponent } from '../markdown-toolbar.component';

/**
 * Inserts a markdown image tag after collecting user input via popover.
 */
export async function insertImage(
  toolbarComponent: NgxMarkdownToolbarComponent,
  anchor?: HTMLElement,
) {
  const result = await toolbarComponent.openPopover('image', anchor);
  if (!result) return;

  const { url, alt } = result as Record<string, string>;
  if (!url) return;

  toolbarComponent.textarea.insertTextAtCursor(`\n![${alt || 'Alt Text'}](${url})`);
}

/**
 * Inserts a markdown link tag after collecting user input via popover.
 */
export async function insertLink(
  toolbarComponent: NgxMarkdownToolbarComponent,
  anchor?: HTMLElement,
) {
  const result = await toolbarComponent.openPopover('link', anchor);
  if (!result) return;

  const { url, text } = result as Record<string, string>;
  if (!url) return;

  toolbarComponent.textarea.insertTextAtCursor(`\n[${text || 'Text'}](${url})`);
}

/**
 * Inserts a markdown heading of selected level (h1-h6) after user selection via popover menu.
 */
export async function insertHeading(
  toolbarComponent: NgxMarkdownToolbarComponent,
  anchor?: HTMLElement,
) {
  const result = (await toolbarComponent.openPopover('heading', anchor)) as Record<string, string>;
  if (!result) return;

  const level = parseInt(result.level, 10);
  if (isNaN(level) || level < 1 || level > 6) return;

  const prefix = '#'.repeat(level) + ' ';
  toolbarComponent.textarea.wrapSelection(`\n\n${prefix}`, 'title');
}

export async function toggleTablePopover(
  toolbarComponent: NgxMarkdownToolbarComponent,
  anchor?: HTMLElement,
) {
  const result = await toolbarComponent.openPopover('table', anchor);
  if (!result) return;

  const content = result as string;
  if (!content) return;

  toolbarComponent.textarea.insertTextAtCursor(content);
}
