import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarkdownEditorConfig } from 'projects/ngx-markdown-editor/src/lib/types/config.interface';
import { NgxMarkdownEditorComponent } from 'projects/ngx-markdown-editor/src/public-api';

@Component({
  selector: 'app-demo-markdown-editor',
  templateUrl: './demo-markdown-editor.component.html',
  styleUrls: ['./demo-markdown-editor.component.scss'],
  imports: [CommonModule, NgxMarkdownEditorComponent],
})
export class DemoMarkdownEditorComponent {
  config: MarkdownEditorConfig = {
    showPreview: true,
    value: '# Hello World\n\nThis is a simple markdown editor.',
    readonly: false,
  };

  handleValueChange(value: string) {
    console.log('Valor actualizado: ', value);
  }
}
