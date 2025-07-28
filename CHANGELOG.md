# Changelog

## [0.1.1] - 2025-07-28
### Added
- **Table Size Selector**:
  - New component for selecting table dimensions.
  - Generates markdown syntax for tables based on user input.
  - Integrated into the Markdown Toolbar as a popover option.

## [0.1.0] - 2025-07-12
### Added
- Introduced the **Markdown Editor** component:
  - Built with Angular Signals and Standalone architecture.
  - Configurable toolbar with support for headings, code, links, images, etc.
  - Live preview using `ngx-markdown`, with support for KaTeX and syntax highlighting.
  - Scroll sync support between editor and preview.
  - Custom theme support via CSS variables.
  - Installation instructions for required `peerDependencies` (`marked`, `prismjs`, `katex`, `clipboard`, `ngx-markdown`, etc.).
  - Manual `angular.json` configuration for scripts and styles (Prism and KaTeX).
  - Clear guidance for first-time users to avoid integration issues.

---

## [0.0.4] - 2024-11-27
### Fixed
- Migrated the project to Angular 19 and Angular Material 19.
- Adjusted the implementation of mixinColor due to its removal in Material 19.
- Created a custom mixin to manage the color property in components, properly using ElementRef.
- Updated MatDatepickerContent class to work with the new color logic without relying on mixinColor.

## [0.0.3] - 2024-11-26
### Added
- Transitioned **Datetime Picker** and library modules to **Standalone Components** for enhanced modularity and simplified usage.
- Improved Angular and Material 18+ compatibility.
- Enhanced documentation to reflect updated features.

## [0.0.2] - 2024-11-25
### Added
- Update the component **Datetime Picker** to Angular and Material 17+ compatibility.
- 

## [0.0.1] - 2024-11-25
### Added
- Initial release of **Angular UI Plusify**.
- Introduced the **Datetime Picker** component:
  - Fully customizable date, time, and datetime selection.
  - Modernized from `@angular-material-components/datetime-picker` for Angular 16+ compatibility.
- Added installation and usage documentation.