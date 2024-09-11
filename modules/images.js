import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import Sharp from "sharp";

const ImageModules = [
	new Module({
		label: "JPEGToPNG",
		description: "Convert .jpeg files to .png.",
		from: "image/jpeg",
		to: "image/png",
		options: [
			new Module.Option({
				label: "ProgressiveInterlacing",
				description:
					"Use progressive (interlace) scan. (default false)",
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
				required: true,
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
				required: true,
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
				required: true,
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
							`Quality should be an integer between 0 and 10. (inclusive)`
						);
				},
			}),
			new Module.Option({
				label: "Colors",
				description:
					"Maximum number of palette entries, sets palette to true",
				type: "number",
				default: 256,
				required: true,
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
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp
				.png({
					progressive: options.ProgressiveInterlacing,
					compressionLevel: options.CompressionLevel,
					adaptiveFiltering: options.AdaptiveFiltering,
					palette: options.Palette,
					quality: options.Quality,
					effort: options.Effort,
					colors: options.Colors,
				})
				.toFile(path);
		},
	}),
];

export default ImageModules;
