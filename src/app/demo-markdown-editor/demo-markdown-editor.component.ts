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
    showPreview: false,
    value: '# Hola Mundo',
    readonly: false,
  };

  showPreview = true;

  constructor() {
    setTimeout(() => {
      this.showPreview = false;
    }, 5000);
  }

  handleValueChange(value: string) {
    console.log('Valor actualizado: ', value);
  }
}
