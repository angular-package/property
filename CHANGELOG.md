# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.1-alpha] - 2024-10-06

### Changed

- Moved `getProperties()` function to `Property.pick()` method. [4fd6289]
- Moved `getProperty()` function to `Property.get()` method. [4fd6289]
- Moved `setProperty()` function to `Property.set()` method. [4fd6289]

- Moved `getDescriptor()` function to `Descriptor.get()` method. [12497e7]
- Moved `getDescriptors()` function to `Descriptor.get()` method. [12497e7]

- Moved `get` object respectively to `Descriptor` and `Property`. [4fd6289]

[12497e7]: https://github.com/angular-package/property/commit/12497e7ad2dc8589a9f7cbd0fd049a91d52c7351
[4fd6289]: https://github.com/angular-package/property/commit/4fd62890002dd5f2a7261575ddae57915bd7f6f9

### Removed

- Removed `getObject()`. [e641735]
- Removed `getExistProperty()`. [4fd6289]

[e641735]: https://github.com/angular-package/property/commit/e64173557a5d2a17bff77a93a2b0b0df0aeeef31
