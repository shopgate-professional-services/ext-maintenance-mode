# Changelog

## [3.0.0] - 2026-10-08
### Added
- Added translations for the remaining PWA locales (`cs-CZ`, `el-GR`, `fi-FI`, `hu-HU`, `nl-NL`, `pl-PL`, `pt-PT`, `ro-RO`, `sv-SE`).
### Changed
- 🔥 Breaking change: the extension now requires PWA 7.32.0 or newer. The maintenance overlay is now styled through `@shopgate/engage/styles` (`makeStyles`) and uses the theme background color instead of the static glamor styles, so it follows the theme configuration of the shop (including the dark color scheme).
- The portal is now a function component that reads its data via `useSelector` hooks instead of `connect`.
### Removed
- Removed the glamor styling.

## [2.5.1] 2026-09-16
### Removed
- pwa peerDependencies version check

## 2.5.0 - 2026-07-20
### Added
- Adds a `timezone` config option (IANA name, e.g. `Europe/Berlin`) so the scheduled start/end dates are interpreted in a fixed, daylight-saving-aware time zone instead of the device's local time. Leaving it empty keeps the previous behaviour.

## 2.4.0 - 2024-10-22
### Fixed
- Disabled extension in CMS 2.0 preview

## [2.3.0] - 2024-04-23
### Fixed
- Fixed release version due to version upload mistakes.

## [1.4.0] - 2023-09-14
### Added
- Adds a start and end date feature for the maintenance mode.
- Adds a blacklist feature of pages that enables the maintenance mode only for these pages.

## [1.3.0] - 2020-03-03
### Added
- Adds whitelist feature for app versions & button link.

## [1.1.0] - 2019-09-02
### Added
- unknown.

## [1.0.0] - 2019-05-03
### Added
- First version.
