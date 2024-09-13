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
import { ImageModules, DocumentModules } from "@nottimtam/file-converter-core";
```

_Do not use both `CoreModules` and a sub-group at the same time, or conflict errors will be thrown._

### ImageModules

-   JPEGToPNG &mdash; `image/jpeg` to `image/png`
-   JPEGToWebP &mdash; `image/jpeg` to `image/webp`
-   JPEGToGIF &mdash; `image/jpeg` to `image/gif`
-   JPEGToAVIF &mdash; `image/jpeg` to `image/avif`
-   JPEGToTIFF &mdash; `image/jpeg` to `image/tiff`
-   PNGToJPEG &mdash; `image/png` to `image/jpeg`
-   PNGToWebP &mdash; `image/png` to `image/webp`
-   PNGToGIF &mdash; `image/png` to `image/gif`
-   PNGToAVIF &mdash; `image/png` to `image/avif`
-   PNGToTIFF &mdash; `image/png` to `image/tiff`
-   WebPToPNG &mdash; `image/webp` to `image/png`
-   WebPToJPEG &mdash; `image/webp` to `image/jpeg`
-   WebPToGIF &mdash; `image/webp` to `image/gif`
-   WebPToAVIF &mdash; `image/webp` to `image/avif`
-   WebPToTIFF &mdash; `image/webp` to `image/tiff`
-   GIFToPNG &mdash; `image/gif` to `image/png`
-   GIFToWebP &mdash; `image/gif` to `image/webp`
-   GIFToJPEG &mdash; `image/gif` to `image/jpeg`
-   GIFToAVIF &mdash; `image/gif` to `image/avif`
-   GIFToTIFF &mdash; `image/gif` to `image/tiff`
-   AVIFToPNG &mdash; `image/avif` to `image/png`
-   AVIFToWebP &mdash; `image/avif` to `image/webp`
-   AVIFToGIF &mdash; `image/avif` to `image/gif`
-   AVIFToJPEG &mdash; `image/avif` to `image/jpeg`
-   AVIFToTIFF &mdash; `image/avif` to `image/tiff`
-   TIFFToPNG &mdash; `image/tiff` to `image/png`
-   TIFFToWebP &mdash; `image/tiff` to `image/webp`
-   TIFFToGIF &mdash; `image/tiff` to `image/gif`
-   TIFFToAVIF &mdash; `image/tiff` to `image/avif`
-   TIFFToJPEG &mdash; `image/tiff` to `image/jpeg`

---

### DocumentModules

-   **ImageToPDF** &mdash; `image/jpeg`, `image/png` to `application/pdf`
-   **PDFtoTXT** &mdash; `application/pdf` to `text/plain`
-   **PDFtoDOCX** &mdash; `application/pdf` to `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
-   **TXTtoPDF** &mdash; `text/plain` to `application/pdf`
-   **TXTtoDOCX** &mdash; `text/plain` to `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
-   **DOCXtoTXT** &mdash; `application/vnd.openxmlformats-officedocument.wordprocessingml.document` to `text/plain`
-   **DOCXtoPDF** &mdash; `application/vnd.openxmlformats-officedocument.wordprocessingml.document` to `application/pdf`

---
