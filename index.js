import ImageModules from "./modules/images.js";
import PDFModules from "./modules/pdfs.js";

export { default as ImageModules } from "./modules/images.js";
export { default as PDFModules } from "./modules/pdfs.js";

const CoreModules = [...ImageModules, ...PDFModules];

export default CoreModules;
