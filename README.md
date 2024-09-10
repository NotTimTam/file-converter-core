# file-converter-core

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

### ImageToBase64

-   Converts From: `image/jpeg`, `image/png`
-   Converts To: `text/plain`
