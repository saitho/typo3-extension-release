# @saithodev/typo3-extension-release

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a CLI tool which helps releasing TYPO3 extensions.

## Features

### Setting version and state in ext_emconf.php

Command:

```shell script
$ typo3-extension-release versionize <version> [state]
```

If no state is given, it will set the state to "stable".
If version ends with "-dev" it will set state to "beta".

```shell script
$ typo3-extension-release versionize 1.2.0
ext_emconf.php: Set version to 1.2.0 and state to stable
```

```shell script
$ typo3-extension-release versionize 1.2.0-dev
ext_emconf.php: Set version to 1.2.0-dev and state to beta
```

```shell script
$ typo3-extension-release versionize 1.2.0-dev stable
ext_emconf.php: Set version to 1.2.0-dev and state to stable
```

## Planned features

- None yet.

## Features that might fit here

- Releasing extension to TYPO3 TER