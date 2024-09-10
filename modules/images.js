import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import Sharp from "sharp";

const ImageModules = [
	new Module({
		label: "JPEGToPNG",
		description: "Convert .jpeg files to .png.",
		from: "image/jpeg",
		to: "image/png",
		method: async ({ path }) => {
			const data = await fs.readFile(path);

			const sharp = new Sharp(data);
			await sharp.png().toFile(path);
		},
	}),
];

export default ImageModules;
