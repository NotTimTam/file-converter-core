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
				required: true,
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
				required: false,
				validateInput: async (value) => {
					if (Boolean(value) !== value)
						throw new SyntaxError(
							`AdaptiveFiltering should be a boolean.`
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
					compressionLevel: options.CompressionLevel
						? options.CompressionLevel
						: 6,
					adaptiveFiltering: options.AdaptiveFiltering,
				})
				.toFile(path);
		},
	}),
];

export default ImageModules;
