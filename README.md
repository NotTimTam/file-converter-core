# @nottimtam/file-converter-core

Core file conversion modules for [@nottimtam/file-converter](https://www.npmjs.com/package/@nottimtam/file-converter).

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
import {
	ImageModules,
	DocumentModules,
	VideoModules,
	AudioModules,
} from "@nottimtam/file-converter-core";
```

_Do not use both `CoreModules` and a sub-group at the same time, or conflict errors will be thrown._

**NOTE:** To use the audio/video modules, you will need to have `ffmpeg` installed to the system your application is running on.

For a `Dockerfile`, you can add the line:

```Dockerfile
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
```

If you do not want to use `AudioModules` or `VideoModules`, manually import the module groups you would like to use instead of using `CoreModules`

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

-   ImageToPDF &mdash; `image/jpeg`, `image/png` to `application/pdf`
-   PDFToTXT &mdash; `application/pdf` to `text/plain`
-   PDFToHTML &mdash; `application/pdf` to `text/html`
-   PDFToDOCX &mdash; `application/pdf` to `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
-   TXTToPDF &mdash; `text/plain` to `application/pdf`
-   TXTToDOCX &mdash; `text/plain` to `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
-   TXTToHTML &mdash; `text/plain` to `text/html`
-   HTMLToTXT &mdash; `text/html` to `text/plain`
-   DOCXToTXT &mdash; `application/vnd.openxmlformats-officedocument.wordprocessingml.document` to `text/plain`
-   DOCXToHTML &mdash; `application/vnd.openxmlformats-officedocument.wordprocessingml.document` to `text/html`

---

### AudioModules

-   AudioToMP3 &mdash; `audio/x-wav`, `audio/x-flac`, `audio/ogg`, `audio/x-aiff` to `audio/mpeg`
-   AudioToWAV &mdash; `audio/mpeg`, `audio/x-flac`, `audio/ogg`, `audio/x-aiff` to `audio/x-wav`
-   AudioToFLAC &mdash; `audio/x-wav`, `audio/mpeg`, `audio/ogg`, `audio/x-aiff` to `audio/x-flac`
-   AudioToOGG &mdash; `audio/x-wav`, `audio/x-flac`, `audio/mpeg`, `audio/x-aiff` to `audio/ogg`
-   AudioToAIFF &mdash; `audio/x-wav`, `audio/x-flac`, `audio/ogg`, `audio/mpeg` to `audio/x-aiff`

---

### VideoModules

-   VideoToMP4 &mdash; `video/x-msvideo`, `video/x-matroska`, `video/quicktime`, `video/webm`, `video/mpeg`, `video/3gpp` to `video/mp4`
-   VideoToAVI &mdash; `video/mp4`, `video/x-matroska`, `video/quicktime`, `video/webm`, `video/mpeg`, `video/3gpp` to `video/x-msvideo`
-   VideoToMKV &mdash; `video/x-msvideo`, `video/mp4`, `video/quicktime`, `video/webm`, `video/mpeg`, `video/3gpp` to `video/x-matroska`
-   VideoToMOV &mdash; `video/x-msvideo`, `video/x-matroska`, `video/mp4`, `video/webm`, `video/mpeg`, `video/3gpp` to `video/quicktime`
-   VideoToWEBM &mdash; `video/x-msvideo`, `video/x-matroska`, `video/quicktime`, `video/mp4`, `video/mpeg`, `video/3gpp` to `video/webm`
-   VideoToMPEG &mdash; `video/x-msvideo`, `video/x-matroska`, `video/quicktime`, `video/webm`, `video/mp4`, `video/3gpp` to `video/mpeg`
-   VideoTo3GP &mdash; `video/x-msvideo`, `video/x-matroska`, `video/quicktime`, `video/webm`, `video/mpeg`, `video/mp4` to `video/3gpp`

---
