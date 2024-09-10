# file-converter-core

Core file conversion modules for file-converter.

## Installation

```terminal
npm i file-converter file-converter-core
```

## Usage

See [file-converter](https://github.com/NotTimTam/file-converter) for general implementation instructions. To implement these modules, add them to the modules array of your `FileConverter` constructor:

```js
import FileConverter from "file-converter";
import CoreModules from "file-converter-core";

const fileConverter = new FileConverter({
	modules: [...CoreModules],
});
```
