import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import PDFDocument from "pdfkit";
import sizeOf from "image-size";

const PDFModules = [
	new Module({
		label: "ImageToPDF",
		description: "Convert .jpeg and .png files to .pdf.",
		from: ["image/jpeg", "image/png"],
		to: "application/pdf",
		options: [],
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			// Get image dimensions.
			const { width, height } = sizeOf(path);

			// Create PDF.
			const pdf = new PDFDocument({ size: [width, height], margin: 0 });

			pdf.image(path, 0, 0, { width, height });

			// Save data.
			pdf.pipe(fs.createWriteStream(path));

			// Close process.
			pdf.end();
		},
	}),
];

export default PDFModules;
