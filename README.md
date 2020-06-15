# @saithodev/typo3-extension-release

[![npm version](https://img.shields.io/npm/v/@saithodev/typo3-extension-release.svg)](https://www.npmjs.com/package/@saithodev/typo3-extension-release)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=typo3-extension-release&metric=alert_status)](https://sonarcloud.io/dashboard?id=typo3-extension-release)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsaitho%2Ftypo3-extension-release.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsaitho%2Ftypo3-extension-release?ref=badge_shield)

This is a CLI tool which helps releasing TYPO3 extensions.

## Installation

Require the package into your TYPO3 extensions's package.json:

```
npm install @saithodev/typo3-extension-release --save-dev
```

## Features

### Setting version and state in ext_emconf.php

Command:

```shell script
$ npx @saithodev/typo3-extension-release versionize <version> {state} [--dry-run]
```

If no state is given, it will set the state to "stable".
If version ends with "-dev" it will set state to "beta".

```shell script
$ npx @saithodev/typo3-extension-release versionize 1.2.0
ext_emconf.php: Set version to 1.2.0 and state to stable
```

```shell script
$ npx @saithodev/typo3-extension-release versionize 1.2.0-dev
ext_emconf.php: Set version to 1.2.0-dev and state to beta
```

```shell script
$ npx @saithodev/typo3-extension-release versionize 1.2.0-dev stable --dry-run
ext_emconf.php: Set version to 1.2.0-dev and state to stable
DRY-RUN active. Nothing written.
```

## Planned features

- Improving console error output (missing params, etc)

## Features that might fit here

- Releasing extension to TYPO3 TER

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsaitho%2Ftypo3-extension-release.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsaitho%2Ftypo3-extension-release?ref=badge_large)