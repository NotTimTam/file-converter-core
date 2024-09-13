import { Module } from "@nottimtam/file-converter";
import fs from "fs-extra";
import PDFDocument from "pdfkit";
import sizeOf from "image-size";
import Poppler from "node-poppler";
import { Document, Packer, Paragraph, TextRun } from "docx";
import mammoth from "mammoth";
import htmlPDF from "html-pdf";
import PdfParse from "pdf-parse";

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
		label: "PDFtoTXT",
		description: "Convert .pdf files to .txt.",
		from: "application/pdf",
		to: "text/plain",
		method: async ({ path }) => {
			const buffer = await fs.readFile(path);

			await new Poppler().pdfToText(buffer, path);
		},
	}),
	new Module({
		label: "PDFtoHTML",
		description: "Convert .pdf files to .html.",
		from: "application/pdf",
		to: "text/html",
		method: async ({ path }) => {
			const buffer = await fs.readFile(path);

			await new Poppler().pdfToHtml(buffer, path);
		},
	}),
	new Module({
		label: "PDFtoDOCX",
		description: "Convert .pdf files to .txt.",
		from: "application/pdf",
		to: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		method: async ({ path }) => {
			const pdfBuffer = await fs.readFile(path);
			const { text } = await PdfParse(pdfBuffer);

			// Create a new DOCX document
			const doc = new Document({
				sections: [
					{
						properties: {},
						children: [
							new Paragraph({
								children: [new TextRun(text)],
							}),
						],
					},
				],
			});

			// Write the DOCX file
			const docxBuffer = await Packer.toBuffer(doc);
			await fs.writeFile(path, docxBuffer);
		},
	}),
	new Module({
		label: "TXTtoPDF",
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
		label: "TXTtoDOCX",
		description: "Convert .txt files to .docx.",
		from: "text/plain",
		to: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		method: async ({ path }) => {
			const text = await fs.readFile(path, "utf-8");

			// Create a new DOCX document
			const doc = new Document();

			// Add text to the DOCX document
			doc.addSection({
				children: [new Paragraph(text)],
			});

			// Create a buffer with the DOCX data
			const docxBuffer = await Packer.toBuffer(doc);

			// Write the DOCX buffer to a file
			await fs.writeFile(path, docxBuffer);
		},
	}),
	new Module({
		label: "DOCXtoTXT",
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
		label: "DOCXtoPDF",
		description: "Convert .docx files to .pdf.",
		from: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		to: "application/pdf",
		method: async ({ path }) => {
			const docxBuffer = await fs.readFile(path);
			const result = await mammoth.convertToHtml({ buffer: docxBuffer });

			// Create a new PDF document
			htmlPDF.create(result.value).toFile(path);
		},
	}),
];

export default DocumentModules;
