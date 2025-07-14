export interface EditorContext {
  insert: (text: string) => void;
  wrap: (before: string, after?: string) => void;
  getSelectedText: () => string;
  copy: () => void;
  insertTable: () => void;
  openPopover?: (type: string, anchor: HTMLElement) => Promise<Record<string, string> | null>;
}
