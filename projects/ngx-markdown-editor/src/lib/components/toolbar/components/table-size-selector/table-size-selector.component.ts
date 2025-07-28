import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-size-selector',
  templateUrl: './table-size-selector.component.html',
  styleUrls: ['./table-size-selector.component.scss'],
  imports: [CommonModule],
})
export class TableSizeSelectorComponent {
  @Output()
  tableSelected = new EventEmitter<string>();

  maxRows: number = 10; // Tamaño máximo de filas en la cuadrícula
  maxCols: number = 10; // Tamaño máximo de columnas en la cuadrícula

  rowsArray: number[] = Array(this.maxRows)
    .fill(0)
    .map((x, i) => i);
  colsArray: number[] = Array(this.maxCols)
    .fill(0)
    .map((x, i) => i);

  hoveredRow: number = -1;
  hoveredCol: number = -1;

  selectedRows: number = 1;
  selectedCols: number = 1;

  onMouseEnter(row: number, col: number) {
    this.hoveredRow = row;
    this.hoveredCol = col;
    this.selectedRows = row + 1;
    this.selectedCols = col + 1;
  }

  onMouseLeave() {
    // Puedes restablecer hoveredRow y hoveredCol si quieres que la selección visual
    // desaparezca cuando el ratón sale del popover, o mantener la última selección.
    // this.hoveredRow = -1;
    // this.hoveredCol = -1;
  }

  selectSize() {
    const content = this.generateTableMarkdown(this.selectedRows, this.selectedCols);
    this.tableSelected.emit(content);
  }

  /**
   * Generates markdown table syntax based on selected size.
   * @param rows Number of rows
   * @param cols Number of columns
   */
  private generateTableMarkdown(rows: number, cols: number): string {
    // Encabezados: | Col 1 | Col 2 | Col 3 |
    const headers = Array.from({ length: cols }, (_, i) => `Col ${i + 1}`).join(' | ');
    const headerLine = `| ${headers} |`;

    // Separador de encabezado: | --- | --- | --- |
    const separatorLine = `| ${Array(cols).fill('---').join(' | ')} |`;

    // Cuerpo: varias filas del tipo | Val 1 | Val 2 | Val 3 |
    const bodyLines = Array.from({ length: rows }, () => {
      const row = Array.from({ length: cols }, (_, i) => `Val ${i + 1}`).join(' | ');
      return `| ${row} |`;
    });

    return `\n\n${headerLine}\n${separatorLine}\n${bodyLines.join('\n')}\n`;
  }
}
