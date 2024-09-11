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
				label: "CompressionLevel",
				description:
					"zlib compression level, 0 (fastest, largest) to 9 (slowest, smallest). (default 6)",
				type: "number",
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
		],
		method: async ({ path }, options = {}) => {
			console.log(options);

			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp
				.png({
					compressionLevel: options.CompressionLevel
						? options.CompressionLevel
						: 6,
				})
				.toFile(path);
		},
	}),
];

export default ImageModules;
