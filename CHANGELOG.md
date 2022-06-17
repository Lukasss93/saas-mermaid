# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.6](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.6) - 2022-06-17

### Added

- Added new route to get cached file: `/cached/{X-Hash}`

### Changed

- Added extension to cached files

## [v1.5](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.5) - 2022-06-12

### Changed

- Moved format parameter to url fragment

## [v1.4](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.4) - 2022-06-11

### Added

- Added ability to use GET method using text parameter

### Changed

- Renamed `generate` route with `render`


## [v1.3.1](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.3.1) - 2022-06-10

### Fixed
- Fixed image size for jpg/png


## [v1.3](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.3) - 2022-06-10

### Added
- Added arm64 support to docker image 
- Added graceful shutdown


## [v1.2](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.2) - 2022-06-10

### Added
- Added ability to change format between svg, png, jpg


## [v1.1](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.1) - 2022-06-08

### Added
- Added ability to disable background with /generate?background=false
- Removed cached file if expired (at runtime)
- Code optimization

### Fixed
- Fixed missing cache folder at startup


## [v1.0](https://github.com/Lukasss93/saas-mermaid/releases/tag/v1.0) - 2022-06-07

- First release
