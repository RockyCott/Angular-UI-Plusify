# Changelog

All notable changes to this project will be documented here.

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