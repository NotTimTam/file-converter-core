import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import sizeOf from "image-size";
import PDFDocument from "pdfkit"; // Generates PDFs.
import { Document, Packer, Paragraph, TextRun } from "docx"; // Generates DOCX files.
import mammoth from "mammoth"; // Reads DOCX files.
import { convert } from "html-to-text";

const DocumentModules = [
	new Module({
		label: "ImageToPDF",
		description: "Convert .jpeg and .png files to .pdf.",
		from: ["image/jpeg", "image/png"],
		to: "application/pdf",
		method: async ({ path }) => {
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
	new Module({
		label: "TXTToPDF",
		description: "Convert .txt files to .pdf.",
		from: "text/plain",
		to: "application/pdf",
		method: async ({ path }) => {
			const text = await fs.readFile(path, "utf-8");

			// Create a new PDF document
			const pdf = new PDFDocument();

			// Add text to PDF
			pdf.text(text);

			// Finalize the PDF and write it to a file
			pdf.pipe(fs.createWriteStream(path));
			pdf.end();
		},
	}),
	new Module({
		label: "TXTToDOCX",
		description: "Convert .txt files to .docx.",
		from: "text/plain",
		to: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		method: async ({ path }) => {
			const text = await fs.readFile(path, "utf-8");

			// Create a new DOCX document
			const doc = new Document({
				sections: [
					{
						properties: {},
						children: [new Paragraph({ text })],
					},
				],
			});

			// Create a buffer with the DOCX data
			const docxBuffer = await Packer.toBuffer(doc);

			// Write the DOCX buffer to a file
			await fs.writeFile(path, docxBuffer);
		},
	}),
	new Module({
		label: "TXTToHTML",
		description: "Convert .txt files to .html.",
		from: "text/plain",
		to: "text/html",
		method: async ({ path, originalname }) => {
			const text = await fs.readFile(path, "utf-8");

			// Write the DOCX buffer to a file
			await fs.writeFile(
				path,
				`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${originalname || "Document"}</title>
</head>
<body>
    <p>${text}</p>
</body>
</html>`
			);
		},
	}),
	new Module({
		label: "HTMLToTXT",
		description: "html .txt files to .txt.",
		from: "text/html",
		to: "text/plain",
		method: async ({ path, originalname }) => {
			const html = await fs.readFile(path, "utf-8");
			const text = convert(html);

			await fs.writeFile(path, text);
		},
	}),
	new Module({
		label: "DOCXToTXT",
		description: "Convert .docx files to .txt.",
		from: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		to: "text/plain",
		method: async ({ path }) => {
			const docxBuffer = await fs.readFile(path);
			const result = await mammoth.extractRawText({ buffer: docxBuffer });

			await fs.writeFile(path, result.value);
		},
	}),
	new Module({
		label: "DOCXToHTML",
		description: "Convert .docx files to .html.",
		from: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		to: "text/html",
		method: async ({ path }) => {
			const docxBuffer = await fs.readFile(path);
			const result = await mammoth.convertToHtml({ buffer: docxBuffer });

			await fs.writeFile(path, result.value);
		},
	}),
];

export default DocumentModules;
