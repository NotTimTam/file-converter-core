import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import PDFDocument from "pdfkit";

const PDFModules = [
	new Module({
		label: "JPEGToPDF",
		description: "Convert .jpeg files to .pdf.",
		from: "image/jpeg",
		to: "application/pdf",
		options: [],
		method: async ({ path }, options = {}) => {
			const data = await fs.readFile(path);

			// Create PDF.
			const pdf = new PDFDocument();

			pdf.image(path);

			// Save data.
			pdf.pipe(fs.createWriteStream(path));

			// Close process.
			pdf.end();
		},
	}),
];

export default PDFModules;
