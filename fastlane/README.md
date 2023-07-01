## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios appcenter_and_TF_build

```sh
[bundle exec] fastlane ios appcenter_and_TF_build
```

IOS build IPA then upload to TestFlight

### ios code_push

```sh
[bundle exec] fastlane ios code_push
```

IOS code push

---

## Android

### android appcenter_and_TF_build

```sh
[bundle exec] fastlane android appcenter_and_TF_build
```

Android build apk then upload to app center

### android code_push

```sh
[bundle exec] fastlane android code_push
```

Android code push

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
