import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import Sharp from "sharp";

const PNG = {
	options: [
		new Module.Option({
			label: "ProgressiveInterlacing",
			description: "Use progressive (interlace) scan. (default false)",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`ProgressiveInterlacing should be a boolean.`
					);
			},
		}),
		new Module.Option({
			label: "CompressionLevel",
			description:
				"zlib compression level, 0 (fastest, largest) to 9 (slowest, smallest). (default 6)",
			type: "number",
			default: 6,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(
						`CompressionLevel should be a number.`
					);
				if (value < 0)
					throw new SyntaxError(
						`CompressionLevel should be greater than or equal to 0.`
					);
				if (value > 9)
					throw new SyntaxError(
						`CompressionLevel should be less than or equal to 9.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`CompressionLevel should be an integer between 0 and 9. (inclusive)`
					);
			},
		}),
		new Module.Option({
			label: "AdaptiveFiltering",
			description: "Use adaptive row filtering.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`AdaptiveFiltering should be a boolean.`
					);
			},
		}),
		new Module.Option({
			label: "Palette",
			description:
				"Quantise to a palette-based image with alpha transparency support",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(`Palette should be a boolean.`);
			},
		}),
		new Module.Option({
			label: "Quality",
			description:
				"Use the lowest number of colours needed to achieve given quality, sets palette to true.",
			type: "number",
			default: 100,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Quality should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Quality should be greater than or equal to 0.`
					);
				if (value > 100)
					throw new SyntaxError(
						`Quality should be less than or equal to 100.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Quality should be an integer between 0 and 100. (inclusive)`
					);
			},
		}),
		new Module.Option({
			label: "Effort",
			description:
				"CPU effort, between 1 (fastest) and 10 (slowest), sets palette to true",
			type: "number",
			default: 7,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Quality should be a number.`);
				if (value < 1)
					throw new SyntaxError(
						`Quality should be greater than or equal to 1.`
					);
				if (value > 10)
					throw new SyntaxError(
						`Quality should be less than or equal to 10.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Quality should be an integer between 1 and 10. (inclusive)`
					);
			},
		}),
		new Module.Option({
			label: "Colors",
			description:
				"Maximum number of palette entries, sets palette to true",
			type: "number",
			default: 256,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Quality should be a number.`);
				if (value < 1)
					throw new SyntaxError(
						`Quality should be greater than or equal to 1.`
					);
				if (value > 256)
					throw new SyntaxError(
						`Quality should be less than or equal to 256.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Quality should be an integer between 1 and 256. (inclusive)`
					);
			},
		}),
	],

	sharp: (options) => ({
		progressive: options.ProgressiveInterlacing,
		compressionLevel: options.CompressionLevel,
		adaptiveFiltering: options.AdaptiveFiltering,
		palette: options.Palette,
		quality: options.Quality,
		effort: options.Effort,
		colors: options.Colors,
	}),
};

const WebP = {
	options: [
		new Module.Option({
			label: "Quality",
			description: "Quality, integer 1-100.",
			type: "number",
			default: 80,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Quality should be a number.`);
				if (value < 1)
					throw new SyntaxError(
						`Quality should be greater than or equal to 1.`
					);
				if (value > 100)
					throw new SyntaxError(
						`Quality should be less than or equal to 100.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Quality should be an integer between 1 and 100. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "AlphaQuality",
			description: "Quality of alpha layer, integer 0-100.",
			type: "number",
			default: 100,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`AlphaQuality should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`AlphaQuality should be greater than or equal to 0.`
					);
				if (value > 100)
					throw new SyntaxError(
						`AlphaQuality should be less than or equal to 100.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`AlphaQuality should be an integer between 0 and 100. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Lossless",
			description: "Use lossless compression mode.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`Lossless value should be a boolean.`
					);
			},
		}),

		new Module.Option({
			label: "NearLossless",
			description: "Use near_lossless compression mode.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`NearLossless value should be a boolean.`
					);
			},
		}),

		new Module.Option({
			label: "SmartSubsample",
			description: "Use high quality chroma subsampling.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`SmartSubsample value should be a boolean.`
					);
			},
		}),

		new Module.Option({
			label: "Preset",
			description:
				"Named preset for preprocessing/filtering, one of: default, photo, picture, drawing, icon, text",
			type: "string",
			default: "default",
			validateInput: async (value) => {
				if (typeof value !== "string")
					throw new SyntaxError(`Preset should be a string.`);

				const presetEnum = [
					"default",
					"photo",
					"picture",
					"drawing",
					"icon",
					"text",
				];

				if (!presetEnum.includes(value))
					throw new SyntaxError(
						"Preset should be one of: 'default', 'photo', 'picture', 'drawing', 'icon', 'text'."
					);
			},
		}),

		new Module.Option({
			label: "Effort",
			description: "CPU effort, between 0 (fastest) and 6 (slowest).",
			type: "number",
			default: 4,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Effort should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Effort should be greater than or equal to 0.`
					);
				if (value > 6)
					throw new SyntaxError(
						`Effort should be less than or equal to 6.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Effort should be an integer between 0 and 6. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Loop",
			description:
				"Number of animation iterations, use 0 for infinite animation.",
			type: "number",
			default: 0,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Effort should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Effort should be greater than or equal to 0.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(`Effort should be an integer.`);
			},
		}),

		new Module.Option({
			label: "Delay",
			description: "Delay between animation frames (in milliseconds).",
			type: "number",
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Delay should be a number.`);
			},
		}),

		new Module.Option({
			label: "MinSize",
			description:
				"Prevent use of animation key frames to minimise file size (slow).",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(`MinSize value should be a boolean.`);
			},
		}),

		new Module.Option({
			label: "Mixed",
			description:
				"Allow mixture of lossy and lossless animation frames (slow).",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(`Mixed value should be a boolean.`);
			},
		}),
	],

	sharp: (options) => ({
		quality: options.Quality,
		alphaQuality: options.AlphaQuality,
		lossless: options.Lossless,
		nearLossless: options.NearLossless,
		smartSubsample: options.SmartSubsample,
		preset: options.Preset,
		effort: options.Effort,
		loop: options.Loop,
		delay: options.Delay,
		minSize: options.MinSize,
		mixed: options.Mixed,
	}),
};

const GIF = {
	options: [
		new Module.Option({
			label: "Reuse",
			description:
				"Re-use existing palette, otherwise generate new (slow).",
			type: "boolean",
			default: true,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(`Reuse value should be a boolean.`);
			},
		}),

		new Module.Option({
			label: "Progressive",
			description: "Use progressive (interlace) scan.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`Progressive value should be a boolean.`
					);
			},
		}),

		new Module.Option({
			label: "Colors",
			description:
				"Maximum number of palette entries, including transparency, between 2 and 256.",
			type: "number",
			default: 256,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Colors should be a number.`);
				if (value < 2)
					throw new SyntaxError(
						`Colors should be greater than or equal to 2.`
					);
				if (value > 256)
					throw new SyntaxError(
						`Colors should be less than or equal to 256.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Colors should be an integer between 2 and 256. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Effort",
			description: "CPU effort, between 1 (fastest) and 10 (slowest).",
			type: "number",
			default: 7,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Effort should be a number.`);
				if (value < 1)
					throw new SyntaxError(
						`Effort should be greater than or equal to 1.`
					);
				if (value > 10)
					throw new SyntaxError(
						`Effort should be less than or equal to 10.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Effort should be an integer between 1 and 10. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Dither",
			description:
				"Level of Floyd-Steinberg error diffusion, between 0 (least) and 1 (most).",
			type: "number",
			default: 1.0,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Dither should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Dither should be greater than or equal to 0.`
					);
				if (value > 1)
					throw new SyntaxError(
						`Dither should be less than or equal to 1.`
					);
			},
		}),

		new Module.Option({
			label: "InterFrameMaxError",
			description:
				"Maximum inter-frame error for transparency, between 0 (lossless) and 32.",
			type: "number",
			default: 0,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(
						`InterFrameMaxError should be a number.`
					);
				if (value < 0)
					throw new SyntaxError(
						`InterFrameMaxError should be greater than or equal to 0.`
					);
				if (value > 32)
					throw new SyntaxError(
						`InterFrameMaxError should be less than or equal to 32.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`InterFrameMaxError should be an integer between 0 and 32. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "InterPaletteMaxError",
			description:
				"Maximum inter-palette error for palette reuse, between 0 and 256.",
			type: "number",
			default: 3,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(
						`InterPaletteMaxError should be a number.`
					);
				if (value < 0)
					throw new SyntaxError(
						`InterPaletteMaxError should be greater than or equal to 0.`
					);
				if (value > 256)
					throw new SyntaxError(
						`InterPaletteMaxError should be less than or equal to 256.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`InterPaletteMaxError should be an integer between 0 and 256. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Loop",
			description:
				"Number of animation iterations, use 0 for infinite animation.",
			type: "number",
			default: 0,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Loop should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Loop should be greater than or equal to 0.`
					);
			},
		}),

		new Module.Option({
			label: "Delay",
			description: "Delay(s) between animation frames (in milliseconds).",
			type: "number",
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Delay should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Delay should be greater than or equal to 0.`
					);
			},
		}),
	],

	sharp: (options) => ({
		reuse: options.Reuse,
		progressive: options.Progressive,
		colors: options.Colors,
		effort: options.Effort,
		dither: options.Dither,
		interFrameMaxError: options.InterFrameMaxError,
		interPaletteMaxError: options.InterPaletteMaxError,
		loop: options.Loop,
		delay: options.Delay,
	}),
};

const AVIF = {
	options: [
		new Module.Option({
			label: "Quality",
			description: "Quality, integer 1-100.",
			type: "number",
			default: 50,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Quality should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Quality should be greater than or equal to 0.`
					);
				if (value > 100)
					throw new SyntaxError(
						`Quality should be less than or equal to 100.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Quality should be an integer between 0 and 100. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Lossless",
			description: "Use lossless compression.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`Lossless value should be a boolean.`
					);
			},
		}),

		new Module.Option({
			label: "Effort",
			description: "CPU effort, between 0 (fastest) and 9 (slowest).",
			type: "number",
			default: 4,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Effort should be a number.`);
				if (value < 0)
					throw new SyntaxError(
						`Effort should be greater than or equal to 0.`
					);
				if (value > 9)
					throw new SyntaxError(
						`Effort should be less than or equal to 9.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Effort should be an integer between 0 and 9. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "ChromaSubsampling",
			description: "Set to '4:2:0' to use chroma subsampling.",
			type: "string",
			default: "4:4:4",
			validateInput: async (value) => {
				if (typeof value !== "string")
					throw new SyntaxError(
						`ChromaSubsampling should be a string.`
					);

				const chromaSubsamplingEnum = ["4:4:4", "4:2:0"];

				if (!chromaSubsamplingEnum.includes(value))
					throw new SyntaxError(
						"ChromaSubsampling should be one of: '4:4:4', '4:2:0'."
					);
			},
		}),

		new Module.Option({
			label: "BitDepth",
			description: "Set bitdepth to 8, 10 or 12 bit.",
			type: "number",
			default: 8,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`BitDepth should be a number.`);

				const bitDepthEnum = [8, 10, 12];

				if (!bitDepthEnum.includes(value))
					throw new SyntaxError(
						"BitDepth should be one of: 8, 10, 12."
					);
			},
		}),
	],

	sharp: (options) => ({
		quality: options.Quality,
		lossless: options.Lossless,
		effort: options.Effort,
		chromaSubsampling: options.ChromaSubsampling,
		bitdepth: options.BitDepth,
	}),
};

const TIFF = {
	options: [
		new Module.Option({
			label: "Quality",
			description: "Quality, integer 1-100.",
			type: "number",
			default: 80,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`Quality should be a number.`);
				if (value < 1)
					throw new SyntaxError(
						`Quality should be greater than or equal to 1.`
					);
				if (value > 100)
					throw new SyntaxError(
						`Quality should be less than or equal to 100.`
					);
				if (value % 1 !== 0)
					throw new SyntaxError(
						`Quality should be an integer between 1 and 100. (inclusive)`
					);
			},
		}),

		new Module.Option({
			label: "Compression",
			description:
				"Compression options: 'none', 'jpeg', 'deflate', 'packbits', 'ccittfax4', 'lzw', 'webp', 'zstd', 'jp2k'.",
			type: "string",
			default: "jpeg",
			validateInput: async (value) => {
				if (typeof value !== "string")
					throw new SyntaxError(`Compression should be a string.`);

				const compressionEnum = [
					"none",
					"jpeg",
					"deflate",
					"packbits",
					"ccittfax4",
					"lzw",
					"webp",
					"zstd",
					"jp2k",
				];

				if (!compressionEnum.includes(value))
					throw new SyntaxError(
						"Compression should be one of: 'none', 'jpeg', 'deflate', 'packbits', 'ccittfax4', 'lzw', 'webp', 'zstd', 'jp2k'."
					);
			},
		}),

		new Module.Option({
			label: "Predictor",
			description:
				"Compression predictor options: 'none', 'horizontal', 'float'.",
			type: "string",
			default: "horizontal",
			validateInput: async (value) => {
				if (typeof value !== "string")
					throw new SyntaxError(`Predictor should be a string.`);

				const predictorEnum = ["none", "horizontal", "float"];

				if (!predictorEnum.includes(value))
					throw new SyntaxError(
						"Predictor should be one of: 'none', 'horizontal', 'float'."
					);
			},
		}),

		new Module.Option({
			label: "Pyramid",
			description: "Write an image pyramid.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(`Pyramid value should be a boolean.`);
			},
		}),

		new Module.Option({
			label: "Tile",
			description: "Write a tiled tiff.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(`Tile value should be a boolean.`);
			},
		}),

		new Module.Option({
			label: "TileWidth",
			description: "Horizontal tile size.",
			type: "number",
			default: 256,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`TileWidth should be a number.`);
			},
		}),

		new Module.Option({
			label: "TileHeight",
			description: "Vertical tile size.",
			type: "number",
			default: 256,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`TileHeight should be a number.`);
			},
		}),

		new Module.Option({
			label: "XRes",
			description: "Horizontal resolution in pixels/mm.",
			type: "number",
			default: 1.0,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`XRes should be a number.`);
			},
		}),

		new Module.Option({
			label: "YRes",
			description: "Vertical resolution in pixels/mm.",
			type: "number",
			default: 1.0,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`YRes should be a number.`);
			},
		}),

		new Module.Option({
			label: "ResolutionUnit",
			description: "Resolution unit options: 'inch', 'cm'.",
			type: "string",
			default: "inch",
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`ResolutionUnit should be a number.`);

				const resolutionUnitEnum = ["inch", "cm"];

				if (!resolutionUnitEnum.includes(value))
					throw new SyntaxError(
						"ResolutionUnit should be one of: 'inch', 'cm'."
					);
			},
		}),

		new Module.Option({
			label: "BitDepth",
			description: "Set bitdepth to 1, 2, 4 or 8 bit.",
			type: "number",
			default: 8,
			validateInput: async (value) => {
				if (typeof value !== "number")
					throw new SyntaxError(`BitDepth should be a number.`);

				const bitDepthEnum = [1, 2, 4, 8];

				if (!bitDepthEnum.includes(value))
					throw new SyntaxError(
						"BitDepth should be one of: 1, 2, 4, 8."
					);
			},
		}),

		new Module.Option({
			label: "Miniswhite",
			description: "Write 1-bit images as miniswhite.",
			type: "boolean",
			default: false,
			validateInput: async (value) => {
				if (Boolean(value) !== value)
					throw new SyntaxError(
						`Miniswhite value should be a boolean.`
					);
			},
		}),
	],

	sharp: (options) => ({
		quality: options.Quality,
		compression: options.Compression,
		predictor: options.Predictor,
		pyramid: options.Pyramid,
		tile: options.Tile,
		tileWidth: options.TileWidth,
		tileHeight: options.TileHeight,
		xres: options.XRes,
		yres: options.YRes,
		resolutionUnit: options.ResolutionUnit,
		bitdepth: options.BitDepth,
		miniswhite: options.Miniswhite,
	}),
};

const ImageModules = [
	new Module({
		label: "JPEGToPNG",
		description: "Convert .jpeg files to .png.",
		from: "image/jpeg",
		to: "image/png",
		options: PNG.options,
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp.png(PNG.sharp(options)).toFile(path);
		},
	}),

	new Module({
		label: "JPEGToWebP",
		description: "Convert .jpeg files to .webp.",
		from: "image/jpeg",
		to: "image/webp",
		options: WebP.options,
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp.webp(WebP.sharp(options)).toFile(path);
		},
	}),

	new Module({
		label: "JPEGToGIF",
		description: "Convert .jpeg files to .gif.",
		from: "image/jpeg",
		to: "image/gif",
		options: GIF.options,
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp.gif(GIF.sharp(options)).toFile(path);
		},
	}),

	new Module({
		label: "JPEGToAVIF",
		description: "Convert .jpeg files to .avif.",
		from: "image/jpeg",
		to: "image/avif",
		options: AVIF.options,
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp.avif(AVIF.sharp(options)).toFile(path);
		},
	}),

	new Module({
		label: "JPEGToTIFF",
		description: "Convert .jpeg files to .tiff.",
		from: "image/jpeg",
		to: "image/tiff",
		options: TIFF.options,
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp.tiff(TIFF.sharp(options)).toFile(path);
		},
	}),
];

export default ImageModules;
