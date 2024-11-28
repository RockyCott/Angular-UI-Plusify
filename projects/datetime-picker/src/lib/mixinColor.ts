import { ThemePalette } from '@angular/material/core';
import { ElementRef } from '@angular/core';

/** Interfaz para las clases que tienen la propiedad `color`. */
export interface CanColor {
  color: ThemePalette;
  defaultColor: ThemePalette | undefined;
}

/** Constructor que incluye ElementRef. */
export type HasElementRef = { _elementRef: ElementRef<HTMLElement> };

/** Mixin para añadir la propiedad `color` y su lógica asociada. */
export function mixinColor<T extends Constructor<HasElementRef>>(
  base: T,
  defaultColor?: ThemePalette,
): T & Constructor<CanColor> {
  return class extends base {
    private _color: ThemePalette | undefined;
    defaultColor = defaultColor;

    constructor(...args: any[]) {
      super(...args);
      // Aplica el color predeterminado inicial.
      this.color = defaultColor!;
    }

    get color(): ThemePalette {
      return this._color!;
    }

    set color(value: ThemePalette) {
      const colorPalette = value || this.defaultColor;

      if (colorPalette !== this._color) {
        const element = this._elementRef.nativeElement;

        // Remueve la clase anterior si existe.
        if (this._color) {
          element.classList.remove(`mat-${this._color}`);
        }

        // Añade la nueva clase si existe.
        if (colorPalette) {
          element.classList.add(`mat-${colorPalette}`);
        }

        this._color = colorPalette;
      }
    }
  };
}
