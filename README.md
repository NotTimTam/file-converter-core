# @nottimtam/file-converter-core

Core file conversion modules for [@nottimtam/file-converter](https://www.npmjs.com/package/@nottimtam/file-converter).

This package is still a work-in-progress, useful modules are in the works.

## Installation

```terminal
npm i @nottimtam/file-converter @nottimtam/file-converter-core
```

## Usage

See [file-converter](https://github.com/NotTimTam/file-converter) for general implementation instructions. To implement these modules, add them to the modules array of your `FileConverter` constructor:

```js
import FileConverter from "@nottimtam/file-converter";
import CoreModules from "@nottimtam/file-converter-core";

const fileConverter = new FileConverter({
	modules: [...CoreModules],
});
```

## Modules

You can use all the modules:

```js
import CoreModules from "@nottimtam/file-converter-core";
```

Or just the groups you need:

```js
import { ImageModules } from "@nottimtam/file-converter-core";
```

_Do not use both `CoreModules` and a sub-group at the same time, or conflict errors will be thrown._

### ImageModules

-   JPEGToPNG &mdash; `image/jpeg` to `image/png`
-   JPEGToWebP &mdash; `image/jpeg` to `image/webp`
-   JPEGToGIF &mdash; `image/jpeg` to `image/gif`
-   JPEGToAVIF &mdash; `image/jpeg` to `image/avif`
-   JPEGToTIFF &mdash; `image/jpeg` to `image/tiff`

---
